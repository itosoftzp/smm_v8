ProcessStatus = function (data, canvas, m, o) {
    this.data = data;
    this.canvas = canvas;
    this.m = m;
    this.o = o;
    var ps = this;
    $(this.canvas).html('');
    $(this.canvas).css({width : 'auto', height:'auto'});
    $(window).resize(function(){
        ps.autoLayout();
    });
};
ProcessStatus.prototype = {
    xpdlModels : [],
    data : null,
    canvas : null,
    connections : [],
    ygap : 150,
    xgap : 50,
    inst : {},
    
    decodeXML : function(value) {
        if (value) {
            return $('<div />').html(value).text();
        } else {
            return '';
        }
    },
    
    unescapeQuote : function(string) {
        var str = string;
        str = str.replace(/\&quot;/g, "\"");
        return str;
    },
    
    escapeXPDL : function(xpdl) {
        var str = xpdl;
        str = str.replace(/\&/g, "&amp;");
        str = str.replace(/xpdl\:/g, "");
        return str;
    },
    
    parseXPDL : function(xpdl) {
        var model = new Object();

        // get XPDL
        var xml = this.escapeXPDL(xpdl);

        // parse XPDL
        var xmlDoc = $.parseXML(xml);
        var $xml = $(xmlDoc);
        var $package = $xml.find("Package");

        // get app details
        var appId = $package.attr("Id");
        var appName = $package.attr("Name");
        model.packageId = appId;
        model.packageName = appName;

        // get participants
        var participants = {};
        var $participantElements = $package.find("Participant");
        for (var i = 0; i < $participantElements.length; i++) {
            var $participantElement = $($participantElements[i]);
            var participantId = $participantElement.attr("Id");
            var participantName = $participantElement.attr("Name");
            var participantType = $participantElement.find("ParticipantType").attr("Type");
            var participant = {class: "participant", type: "ROLE"};
            participant.id = participantId;
            participant.name = this.decodeXML(participantName);
            participant.type = participantType;
            participants[participantId] = participant;
        }
        model.participants = participants;

        // get processes
        var processes = {};
        var $processElements = $package.find("WorkflowProcess");
        for (var p = 0; p < $processElements.length; p++) {
            var $processElement = $($processElements[p]);
            var processId = $processElement.attr("Id");
            var processName = $processElement.attr("Name");
            var dataFields;
            var formalParameters;
            var process = {class: "process"};
            process.id = processId;
            process.name = this.decodeXML(processName);
            processes[processId] = process;

            // get workflow variables
            var dataFields = new Array();
            var $dataFields = $processElement.find("DataField");
            $dataFields.each(function() {
                var $dataField = $(this);
                var dataFieldId = $dataField.attr("Id");
                var dataField = new Object();
                dataField.variableId = dataFieldId;
                dataFields.push(dataField);
            });
            process.dataFields = dataFields;

            // get SLA properties
            var durationUnit;
            var limit;
            var $processHeader = $processElement.find("ProcessHeader");
            if ($processHeader) {
                durationUnit = $processHeader.attr("DurationUnit");
                limit = $processHeader.find("Limit").text();
            }
            process.durationUnit = durationUnit;
            process.limit = limit;

            // get formal parameters
            var formalParameters = new Array();
            var $formalParameters = $processElement.find("FormalParameter");
            $formalParameters.each(function() {
                var $formalParameter = $(this);
                var parameterId = $formalParameter.attr("Id");
                var mode = $formalParameter.attr("Mode");
                var formalParameter = new Object();
                formalParameter.parameterId = parameterId;
                formalParameter.mode = mode;
                formalParameters.push(formalParameter);
            });
            process.formalParameters = formalParameters;

            // get activities
            process.activities = {};
            var $activityElements = $processElement.find("Activity");
            for (var i = 0; i < $activityElements.length; i++) {
                // get activity details
                var $activityElement = $($activityElements[i]);
                var activityId = $activityElement.attr("Id");
                var activityName = $activityElement.attr("Name");
                var subflowId = null;
                if ($activityElement.find("SubFlow").length > 0) {
                    subflowId = $activityElement.find("SubFlow").attr("Id");
                    if (subflowId === "") {
                        subflowId = "none";
                    }
                }
                var activity;
                var activityType = "activity";
                if ($activityElement.find("Route").length > 0) {
                    activity = {class: "route", type: "route"};
                    activityType = "route";
                } else if ($activityElement.find("Tool").length > 0) {
                    activity = {class: "tool"};
                    activityType = "tool";
                } else if (subflowId) {
                    activity = {class: "subflow", type: "subflow"};
                    activityType = "subflow";
                } else {
                    activity = {class: "activity"};
                    activityType = "activity";
                }
                var join = $activityElement.find("Join").length > 0 ? $activityElement.find("Join").attr("Type") : "";
                var split = $activityElement.find("Split").length > 0 ? $activityElement.find("Split").attr("Type") : "";
                var joinTransitions = [];
                var $joinTransitionRefs = $activityElement.find("Join").find("TransitionRef");
                if ($joinTransitionRefs.length > 0) {
                    $joinTransitionRefs.each(function(index) {
                        var transitionId = $(this).attr("Id");
                        joinTransitions[index] = transitionId;
                    });
                }
                var splitTransitions = [];
                var $splitTransitionRefs = $activityElement.find("Split").find("TransitionRef");
                if ($splitTransitionRefs.length > 0) {
                    $splitTransitionRefs.each(function(index) {
                        var transitionId = $(this).attr("Id");
                        splitTransitions[index] = transitionId;
                    });
                }
                var performer = $activityElement.find("ExtendedAttribute[Name='JaWE_GRAPH_PARTICIPANT_ID']").attr("Value");
                var offset = $activityElement.find("ExtendedAttribute[Name='JaWE_GRAPH_OFFSET']").attr("Value");
                var coords = offset.split(",");
                var activityX = coords[0];
                var activityY = coords[1];
                activity.id = activityId;
                activity.name = this.decodeXML(activityName);
                activity.type = activityType;
                activity.join = join;
                activity.split = split;
                activity.performer = performer;
                activity.subflowId = subflowId;
                activity.x = activityX;
                activity.y = activityY;
                activity.joinTransitions = joinTransitions;
                activity.splitTransitions = splitTransitions;
                activity.process = process;
                process.activities[activityId] = activity;

                // get limit
                var $limit = $activityElement.find("Limit");
                var limit = ($limit.length > 0) ? $limit.text() : null;
                activity.limit = limit;

                // get deadlines
                var deadlines = new Array();
                var $deadlines = $activityElement.find("Deadline");
                $deadlines.each(function() {
                    var $deadline = $(this);
                    var deadline = new Object();
                    var durationUnit;
                    var deadlineLimit;
                    deadline.execution = $deadline.attr("Execution");
                    deadline.exceptionName = $deadline.find("ExceptionName").text();
                    var deadlineCondition = $deadline.find("DeadlineCondition").text();
                    if (deadlineCondition) {
                        if (deadlineCondition.indexOf("dd/MM/yyyy HH:mm") >= 0) {
                            durationUnit = "t";
                            var matches = deadlineCondition.match("parse\(.+\)");
                            if (matches.length > 1) {
                                deadlineLimit = matches[1].substring(1, matches[1].length-2);
                            }
                        } else if (deadlineCondition.indexOf("dd/MM/yyyy") >= 0) {
                            durationUnit = "d";
                            var matches = deadlineCondition.match("parse\(.+\)");
                            if (matches.length > 1) {
                                deadlineLimit = matches[1].substring(1, matches[1].length-2);
                            }
                        } else if (deadlineCondition.indexOf("yyyy-MM-dd HH:mm") >= 0) {
                            durationUnit = "2";
                            var matches = deadlineCondition.match("parse\(.+\)");
                            if (matches.length > 1) {
                                deadlineLimit = matches[1].substring(1, matches[1].length-2);
                            }
                        } else if (deadlineCondition.indexOf("yyyy-MM-dd") >= 0) {
                            durationUnit = "1";
                            var matches = deadlineCondition.match("parse\(.+\)");
                            if (matches.length > 1) {
                                deadlineLimit = matches[1].substring(1, matches[1].length-2);
                            }
                        } else {
                            var limitMatch = deadlineCondition.match("\\+\\(.+\\*");
                            if (limitMatch && limitMatch.length > 0) {
                                deadlineLimit = limitMatch[0].substring(2, limitMatch[0].length-1);
                            }
                            var unitMatch = deadlineCondition.match("\\*\\d+\\)");
                            if (unitMatch && unitMatch.length > 0) {
                                var millis = unitMatch[0].substring(1, unitMatch[0].length-1);
                                if (millis === "1000") {
                                    durationUnit = "s";
                                } else if (millis === "60000") {
                                    durationUnit = "m";
                                } else if (millis === "3600000") {
                                    durationUnit = "h";
                                } else {
                                    durationUnit = "D";
                                }
                            }
                        }
                        deadline.durationUnit = durationUnit;
                        deadline.deadlineLimit = deadlineLimit;
                    }
                    deadlines.push(deadline);
                });
                activity.deadlines = deadlines;

                // get subflow parameters
                var $subflow = $activityElement.find("SubFlow");
                if ($subflow.length > 0) {
                    var execution = $subflow.attr("Execution");
                    activity.execution = execution;
                    var actualParameters = new Array();
                    var $actualParameters = $subflow.find("ActualParameter");
                    $actualParameters.each(function() {
                        var $actualParameter = $(this);
                        var parameterId = $actualParameter.text();
                        var actualParameter = new Object();
                        actualParameter.actualParameter = parameterId;
                        actualParameters.push(actualParameter);
                    });
                    activity.actualParameters = actualParameters;
                }
            }

            // get transitions
            process.transitions = new Array();
            var $transitionElements = $processElement.find("Transition");
            for (var i = 0; i < $transitionElements.length; i++) {
                var $transitionElement = $($transitionElements[i]);
                var transitionId = $transitionElement.attr("Id");
                var transitionName = $transitionElement.attr("Name");
                var transitionFrom = $transitionElement.attr("From");
                var transitionTo = $transitionElement.attr("To");
                var transitionType = $transitionElement.find("Condition").length > 0 ? $transitionElement.find("Condition").attr("Type") : "";
                var transitionCondition = $transitionElement.find("Condition[Type='CONDITION']").length > 0 ? $transitionElement.find("Condition[Type='CONDITION']").text() : "";
                var transitionException = $transitionElement.find("Condition[Type='EXCEPTION']").length > 0 ? $transitionElement.find("Condition[Type='EXCEPTION']").text() : "";
                var transitionStyle = $transitionElement.find("ExtendedAttribute[Name='JaWE_GRAPH_BREAK_POINTS']").length > 0 ? "orthogonal" : "straight";
                var transitionConditions = $transitionElement.find("ExtendedAttribute[Name='PBUILDER_TRANSITION_CONDITIONS']").length > 0 ? $transitionElement.find("ExtendedAttribute[Name='PBUILDER_TRANSITION_CONDITIONS']").attr("Value") : null;
                var transition = {class: "transition"};
                transition.id = transitionId;
                transition.name = this.decodeXML(transitionName);
                transition.from = transitionFrom;
                transition.to = transitionTo;
                transition.type = transitionType;
                transition.condition = this.decodeXML(transitionCondition);
                transition.exceptionName = this.decodeXML(transitionException);
                transition.style = transitionStyle;
                transition.process = process;
                if (transitionConditions !== null) {
                    transition.conditionHelper = "yes";
                    transitionConditions = this.decodeXML(transitionConditions);
                    transitionConditions = this.unescapeQuote(transitionConditions);
                    transition.conditions = JSON.decode(transitionConditions);
                }
                // add join and split transitions
                var joinActivity = process.activities[transitionTo];
                if (!joinActivity.joinTransitions || joinActivity.joinTransitions.length === 0) {
                    joinActivity.joinTransitions = [];
                }
                if (joinActivity.joinTransitions.indexOf(transitionId) < 0) {
                    joinActivity.joinTransitions.push(transitionId);
                }
                var splitActivity = process.activities[transitionFrom];
                if (!splitActivity.splitTransitions || splitActivity.splitTransitions.length === 0) {
                    splitActivity.splitTransitions = [];
                }
                if (splitActivity.splitTransitions.indexOf(transitionId) < 0) {
                    splitActivity.splitTransitions.push(transitionId);
                }
                process.transitions[i] = transition;
            }

            // get start and end nodes
            process.startEndNodes = {};
            var $startEndElements = $processElement.find("ExtendedAttribute[Name='JaWE_GRAPH_START_OF_WORKFLOW'], ExtendedAttribute[Name='JaWE_GRAPH_END_OF_WORKFLOW']");
            for (var i = 0; i < $startEndElements.length; i++) {
                // get node values
                var swimlane;
                var activityId;
                var xOffset;
                var yOffset;
                var $startEndElement = $($startEndElements[i]);
                var value = $startEndElement.attr("Value");
                var type = ($startEndElement.attr("Name") === "JaWE_GRAPH_START_OF_WORKFLOW") ? "start" : "end";
                var options = value.split(",");
                for (var j = 0; j < options.length; j++) {
                    var option = options[j];
                    var keyvalue = option.split("=");
                    var key = keyvalue[0];
                    var value = keyvalue[1];
                    if (key === "CONNECTING_ACTIVITY_ID") {
                        activityId = value;
                    } else if (key === "JaWE_GRAPH_PARTICIPANT_ID") {
                        swimlane = value;
                    } else if (key === "X_OFFSET") {
                        xOffset = value;
                    } else if (key === "Y_OFFSET") {
                        yOffset = value;
                    }
                }
                var startEnd = {class: "startend"};
                startEnd.id = activityId;
                startEnd.type = type;
                startEnd.performer = swimlane;
                startEnd.x = xOffset;
                startEnd.y = yOffset;
                startEnd.process = process;
                process.startEndNodes[startEnd.type + "_" + activityId] = startEnd;
            }

            // get participant swimlanes
            var swimlanes = $processElement.find("ExtendedAttribute[Name='JaWE_GRAPH_WORKFLOW_PARTICIPANT_ORDER']").attr("Value");
            process.swimlanes = swimlanes;
        }
        model.processes = processes;
        return model;
    },

    loadXpdl : function(id, xpdl) {
        var model = this.parseXPDL(xpdl);
        this.xpdlModels[id] = model;
    },
    
    initTip : function() {
        this.canvas.find(".node:not(.noTip)").each(function() {
            $(this).qtip({
                content: {
                    text: $(this).find('.extra_info')
                },
                position: {
                  my: 'top center',
                  at: 'bottom center'
                },
                style: {
                  classes: 'qtip-bootstrap'
                },
                show: {
                    event: 'click mouseenter'
                }
            });
        });
    },
    
    autoLayout: function() {
        var processStatus = this;
        this.clearConnections();
        
        $(this.canvas).find(".subprocess_container").each(function(){
            processStatus.autoLayoutSubProcess($(this), true); 
        });
        
        $(this.canvas).find(".process_container").each(function(){
            processStatus.calculateLayout($(this), false); 
        });
        
        this.connectNodes();
    },
    
    autoLayoutSubProcess: function(container) {
        var thisObject = this;
        $(container).find(".subprocess_container").each(function(){
            thisObject.autoLayoutSubProcess($(this)); 
        });
        thisObject.calculateLayout(container, true); 
    },
    
    calculateLayout : function(pc, isSubflow) {
        var processStatus = this;
        var connections = this.connections;
        
        $(pc).css({width:'auto', height:'auto'});
        
        var ygap = processStatus.ygap;
        var xgap = processStatus.xgap;
        if (isSubflow) {
            ygap = ygap/2;
            xgap = xgap/2;
        }
        
        var mode = "leftToRight";
        if ($(this.canvas).width() <= 760) {
            mode = "topToBottom";
        }
        
        var g = new dagre.graphlib.Graph();
        var gOptions = {
            acyclicer : "greedy"
        };
        if (mode === "topToBottom") {
            gOptions["rankdir"] = "TB";
        } else {
            gOptions["rankdir"] = "LR";
        }

        g.setGraph(gOptions);
        g.setDefaultEdgeLabel(function() { return {}; });
        var nodes = $(pc).find("> .senode, > .node, > .fsenode, > .fnode"); 
        for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            var elWidth = $(n).width();
            var elHeight = $(n).height();
            var width = elWidth + xgap;
            var height = elHeight + ygap;
            if (mode === "topToBottom") {
                width = elHeight + ygap;
                height = elWidth + xgap;
            }
            g.setNode($(n).attr("id"), {width: width, height: height});
        }
        for (var i = 0; i < connections.length; i++) {
            var c = connections[i];
            if ($(pc).find("> #"+c.source).length > 0) {
                g.setEdge(c.source,c.target);
            }
        }
        // calculate the layout (i.e. node positions)
        dagre.layout(g);

        // Applying the calculated layout
        g.nodes().forEach(function(v) {
            var el = $("#" + v);
            var left = g.node(v).x - ($(el).width()/2);
            var top = g.node(v).y - ($(el).height()/2);

            if (el.hasClass("start")) {
                top += 10;
            } else if (el.hasClass("endNode")) {
                top += 7;
            }

            el.css("left", left + "px");
            el.css("top",  top + "px");
        });

        $(pc).css("height", (g.graph().height + 100) + "px");
        $(pc).css("width", (g.graph().width + 100) + "px");
    },

    draw : function () {
        this.clear();
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].status === undefined) {
                this.drawProcess(this.data[i]);
            }
        }
        
        this.drawEndNode();
        this.autoLayout();
        this.initTip();
    },

    drawProcess : function(processData, processContainer, startNodeLink, activeNodes, migratedSubProcess, isSubflow) {
        var thisObject = this;
        
        processData.status = "drawing";
        var pId = processData.process.id;
        var processModel = this.getProcessModel(processData.process);
        
        var migratedProcessData = null;
        if ("closed.aborted" === processData.process.state) {
            migratedProcessData = this.getSubflowData(processData.process.instanceId, null, pId);
        }
        
        if (migratedSubProcess === undefined) {
            migratedSubProcess = false;
        }

        if (processContainer === undefined || processContainer === null) {
            processContainer = this.createProcessContainer(processData, processModel);
        }

        if (activeNodes === undefined || activeNodes === null) {
            if (startNodeLink === undefined || startNodeLink === null) {
                var startNode = this.createStartNode(processContainer, processData, isSubflow);
                startNodeLink = [$(startNode).attr("id")];
            }

            activeNodes = {};
            var firstActivity = this.getStartNode(processModel);
            activeNodes[pId+"_"+firstActivity.id] = {
                links : startNodeLink
            };
        }

        var lastActId = null;

        //loop through the process data
        for (var a = 0; a < processData.activities.length; a++) {
            var act = processData.activities[a];
            var actModel = this.getActivityModel(processModel, act.activityDefId);
            if ((migratedProcessData !== null || migratedSubProcess) && act.state === "closed.aborted" && actModel.type !== "subflow") {
                //ignore
            } else {
                var tempActiveNode = activeNodes[pId+"_"+act.activityDefId];
                if (tempActiveNode === undefined) {
                    continue;
                }
                var links = [act.id];
                if (actModel.type === "activity") {
                    this.createNode(processContainer, act, tempActiveNode.links);
                    lastActId = act.id;
                } else if (actModel.type === "subflow") {
                    //check wether subflow have human activities or not. If not, do not display it.
                    var hasActivities = false;
                    var subflowProcessData = thisObject.getSubflowDataByInstanceID(act.subflow_instance_id);
                    var subflowProcessModel = thisObject.getProcessModel(subflowProcessData.process);
                    for (var i in subflowProcessModel.activities) {
                        if (subflowProcessModel.activities[i].type === "activity") {
                            hasActivities = true;
                            break;
                        }
                    }
                    if (hasActivities) {
                        thisObject.createSubflowNode(processContainer, act, tempActiveNode.links, subflowProcessData, processData, actModel);
                        lastActId = act.id;

                        if (actModel.execution !== "SYNCHR") {
                            links = tempActiveNode.links;
                        }
                    } else {
                        links = tempActiveNode.links;
                        subflowProcessData.status = "done";
                    }
                } else if (actModel.type === "route" && (actModel.split === "AND")) {
                    this.createRouteNode(processContainer, act, tempActiveNode.links);
                    lastActId = act.id;
                } else {
                    links = tempActiveNode.links;
                }

                if (actModel.splitTransitions !== undefined) {
                    for (var t=0; t<actModel.splitTransitions.length; t++) {
                        var transition = this.getTransitionModel(processModel, actModel.splitTransitions[t]);
                        var toNodeModel = this.getActivityModel(processModel, transition.to);
                        var toActiveNode = activeNodes[pId+"_"+transition.to];
                        if (toNodeModel.join !== "AND") {
                            toActiveNode = null;
                        }
                        if (toActiveNode === undefined || toActiveNode === null) {
                            toActiveNode = {
                                links : links
                            };
                        } else {
                            for (var l = 0; l < links.length; l++) {
                                toActiveNode.links.push(links[l]);
                            }
                        }
                        activeNodes[pId+"_"+transition.to] = toActiveNode;
                    }
                }

                if (!(migratedProcessData !== null && act.state === "closed.aborted")) {
                    delete activeNodes[pId+"_"+act.activityDefId];
                }
            }
        }
        if (migratedProcessData !== null) {
            this.drawProcess(migratedProcessData, processContainer, null, activeNodes);
        }
        
        if ("open.running" === processData.process.state && (this.o.showFutureActivities !== undefined && this.o.showFutureActivities !== null && this.o.showFutureActivities === "true")) {
            $(processContainer).find(".node.running:not(.future_done)").each(function(){
                thisObject.drawFutureActivies(processContainer, processModel, pId, this, processData.process.instanceId);
                $(this).addClass("future_done");
            });
        }

        processData.status = "done";
        return lastActId;
    },
    
    drawEndNode : function() {
        var connections = this.connections;
        $(this.canvas).find(".process_container").each(function(){
            var pc = this;
            $(pc).find(".node").each(function(){
                var id = $(this).attr("id");
                var addEndNode = true;
                if ($(this).hasClass("running")) {
                    addEndNode = false;
                } else {
                    for (var c = 0; c < connections.length; c++) {
                        if (connections[c].source === id) {
                            addEndNode = false;
                            break;
                        }
                    }
                }
                if (addEndNode) {
                    $(this).after("<div class='senode end' id='"+id+"_endNode'></div>");
                    connections.push({source:id, target: id+"_endNode"});
                }
            });
        });
    },

    createProcessContainer : function (processData, processModel) {
        if (this.o.showProcessName !== undefined && this.o.showProcessName !== null && this.o.showProcessName === "true") {
            $(this.canvas).append("<h2 class=\"process_title\">"+processData.process.name+"</h2>");
        }
        $(this.canvas).append("<div id=\""+processData.process.instanceId+"\" class=\"process_container\" data-processdefid=\""+processData.process.id+"\"></div>");
        var container = $(this.canvas).find("#"+processData.process.instanceId);
        
        this.inst[processData.process.instanceId] = jsPlumb.getInstance({
            Container: processData.process.instanceId,
            Anchor: "Continuous",
            Endpoint: ["Dot", {radius: 3}],
            PaintStyle: {strokeStyle: "#000", lineWidth: 1},
            Connector : ["StateMachine", {curviness:0.1}],
            ConnectionOverlays: [
                ["Arrow", {
                    location: 1,
                    id: "arrow",
                    length: 10,
                    width: 10,
                    foldback: 0.8
                }]
            ],
            ConnectionsDetachable: false
        });
        
        return container;
    },

    createStartNode : function(processContainer, processData, isSubflow) {
        var id = processData.process.instanceId + "_runProcess";
        
        $(processContainer).append("<div class='senode start' id='"+id+"_startNode'></div>");
        
        if (isSubflow === undefined) {
            this.connections.push({source:id+"_startNode", target: id});

            var nodeData = {
                "acceptedUser": processData.process.requesterId,
                "activityDefId": "runProcess",
                "createdTime": processData.process.createdTime,
                "id": id,
                "name": this.m["start.activity"],
                "state": "closed.completed"
            };

            return this.createNode(processContainer, nodeData);
        } else {
            return $(processContainer).find(".senode.start");
        }
    },

    createNode : function(processContainer, nodeData, connectedNodes) {
        var thisObject = this;
        var status = "running";
        if (nodeData.state === "closed.aborted") {
            status = "aborted";
        } else if (nodeData.state === "closed.completed") {
            status = "completed";
        } else if (nodeData.state === "closed.terminated") {
            status = "terminated";
        }
        
        $(processContainer).append("<div class='node "+status+"' id='"+nodeData.id+"' data-actDefId='"+nodeData.activityDefId+"' ></div>");
        var node = $(processContainer).find("#"+nodeData.id);
        node.append("<h5 class='node_name'>"+nodeData.name+"</h5>");
        if (status === "completed") {
            node.append("<span class='node_performer'>"+nodeData.acceptedUser+"</h5>");
        }
        var extraInfo = $("<div class='extra_info' style='display:none;'></div>");
        $(extraInfo).append("<span class='node_meta node_status'>"+this.m["node.status"]+this.m["status."+status]+"</span>");
        if (status === "running") {
            $(extraInfo).append("<span class='node_meta node_assignee'>"+this.m["node.assignees"]+nodeData.assignmentUsers.join(", ")+"</span>");
        }
        $(extraInfo).append("<span class='node_meta node_created'>"+this.m["node.createdTime"]+nodeData.createdTime+"</span>");
        if (nodeData.finishTime !== undefined && status !== "running") {
            $(extraInfo).append("<span class='node_meta node_finished'>"+this.m["node.finishedTime"]+nodeData.finishTime+"</span>");
        }
        if (nodeData.serviceLevelMonitor !== undefined) {
            $(extraInfo).append("<span class='node_meta node_sla'>"+this.m["node.serviceLevelMonitor"]+nodeData.serviceLevelMonitor+"</span>");
        }
        if (nodeData.duedate !== undefined) {
            $(extraInfo).append("<span class='node_meta node_duedate'>"+this.m["node.dueDate"]+nodeData.duedate+"</span>");
        }
        if (nodeData.delay !== undefined) {
            $(extraInfo).append("<span class='node_meta node_delay'>"+this.m["node.delay"]+nodeData.delay+"</span>");
        }
        if (nodeData.custom !== undefined) {
            $(extraInfo).append("<span class='node_meta node_custom'>"+nodeData.custom+"</span>");
        }

        node.append(extraInfo);

        if (connectedNodes !== undefined) {
            for (var c = 0; c < connectedNodes.length ; c++) {
                this.connections.push({source:connectedNodes[c], target: nodeData.id});
            }
        }

        return node;
    },
    
    createSubflowNode : function(processContainer, nodeData, connectedNodes, subflowProcessData, processData, actModel) {
        var thisObject = this;
        
        var status = "running";
        if (nodeData.state === "closed.aborted") {
            status = "aborted";
        } else if (nodeData.state === "closed.completed") {
            status = "completed";
        } else if (nodeData.state === "closed.terminated") {
            status = "terminated";
        }
        
        $(processContainer).append("<div class='node sfnode noTip "+status+"' id='"+nodeData.id+"' data-actDefId='"+nodeData.activityDefId+"' data-processInstId='"+nodeData.subflow_instance_id+"'></div>");
        var node = $(processContainer).find("#"+nodeData.id);
        node.append("<h5 class='node_name'>"+nodeData.name+"</h5>");
        node.append("<div id=\""+nodeData.subflow_instance_id+"\" class=\"subprocess_container\"></div>");
        
        var container = $(node).find("#"+nodeData.subflow_instance_id);
        
        thisObject.inst[nodeData.subflow_instance_id] = jsPlumb.getInstance({
            Container: nodeData.subflow_instance_id,
            Anchor: "Continuous",
            Endpoint: ["Dot", {radius: 3}],
            PaintStyle: {strokeStyle: "#000", lineWidth: 1},
            Connector : ["StateMachine", {curviness:0.1}],
            ConnectionOverlays: [
                ["Arrow", {
                    location: 1,
                    id: "arrow",
                    length: 10,
                    width: 10,
                    foldback: 0.8
                }]
            ],
            ConnectionsDetachable: false
        });
        
        thisObject.drawProcess(subflowProcessData, container, null, null, null, true);
        
        if (connectedNodes !== undefined) {
            for (var c = 0; c < connectedNodes.length ; c++) {
                this.connections.push({source:connectedNodes[c], target: nodeData.id});
            }
        }

        return node;
    },
    
    createRouteNode : function(processContainer, nodeData, connectedNodes) {
        var status = "completed";
        
        $(processContainer).append("<div class='node route noTip"+status+"' id='"+nodeData.id+"' data-actDefId='"+nodeData.activityDefId+"' ></div>");
        var node = $(processContainer).find("#"+nodeData.id);

        if (connectedNodes !== undefined) {
            for (var c = 0; c < connectedNodes.length ; c++) {
                this.connections.push({source:connectedNodes[c], target: nodeData.id});
            }
        }

        return node;
    },
    
    drawFutureActivies : function (processContainer, processModel, pId, nodeEl, pInstId) {
        var thisObject = this;
        
        var actId = $(nodeEl).attr("id");
        var actDefId = $(nodeEl).data("actdefid");
        
        var prefix = pInstId;
        
        var actModel = thisObject.getActivityModel(processModel, actDefId);
        
        var activities = {};
        var queue = [];
        var current = null;
        var prev = null;
        
        //Build paths
        do {
            if (current === null) {
                current = actModel.id;
                prev = actId;
            } else {
                current = queue.shift();
                prev = current;
            }
            var temp = thisObject.getNextTransitions(processModel, current);
            if (temp.length > 0) {
                for (var t in temp) {
                    if (activities[temp[t]] === undefined) {
                        var model = thisObject.getActivityModel(processModel, temp[t]);
                        
                        activities[temp[t]] = {
                            model : model,
                            prev : [prev],
                            next : []
                        };
                        queue.push(temp[t]);
                    } else if (activities[temp[t]].prev.indexOf(current) === -1) {
                        activities[temp[t]].prev.push(prev);
                    }
                }
                
                if (activities[prev] !== undefined) {
                    activities[prev].next = temp;
                }
            }
            
        } while (queue.length > 0);
        
        //clean data
        //1. add future end note
        var ends = {};
        for (var a in activities) {
            if (activities[a].next.length === 0) {
                ends[a+"_end"] = {
                    model : {
                        type : "endNode"
                    },
                    prev : [a],
                    next : []
                };
                activities[a].next.push(a+"_end");
            }
        }
        activities = $.extend(activities, ends);
        
        //2. remove tools
        var tools = [];
        for (var a in activities) {
            if (activities[a].model.type === "tool") {
                var prev = activities[a].prev;
                var next = activities[a].next;
                
                for (var p in prev) {
                    var prevAct = activities[prev[p]];
                    if (prevAct !== undefined) {
                        prevAct.next.splice(prevAct.next.indexOf(a), 1);
                        for (var n in next) {
                            prevAct.next.push(next[n]);
                        }
                    }
                }
                
                for (var n in next) {
                    var nextAct = activities[next[n]];
                    if (nextAct !== undefined) {
                        nextAct.prev.slice(nextAct.prev.indexOf(a), 1);
                        for (var p in prev) {
                            nextAct.prev.push(prev[p]);
                        }
                    }
                }
                
                tools.push(a);
            }
        }
        for (var t in tools) {
            delete activities[tools[t]];
        }
        
        //3. Async subflow
        for (var a in activities) {
            if (activities[a].model.type === "subflow" && activities[a].model.execution !== "SYNCHR") {
                var prev = activities[a].prev;
                var next = activities[a].next;
                
                for (var p in prev) {
                    var prevAct = activities[prev[p]];
                    if (prevAct !== undefined) {
                        for (var n in next) {
                            prevAct.next.push(next[n]);
                        }
                    }
                }
                
                for (var n in next) {
                    var nextAct = activities[next[n]];
                    if (nextAct !== undefined) {
                        nextAct.prev = nextAct.prev.slice(nextAct.prev.indexOf(a), 1);
                        for (var p in prev) {
                            nextAct.prev.push(prev[p]);
                        }
                    }
                }
                
                var ends = {};
                ends[a+"_end"] = {
                    model : {
                        type : "endNode"
                    },
                    prev : [a],
                    next : []
                };
                
                activities = $.extend(activities, ends);
                
                activities[a].next = [a+"_end"];
            }
        }
        
        //4. remove unnecessary route
        var removeRoutes = [];
        for (var a in activities) {
            if (activities[a].model.type === "route" && activities[a].prev.length === 1 && activities[a].next.length === 1) {
                var prev = activities[a].prev;
                var next = activities[a].next;
                
                for (var p in prev) {
                    var prevAct = activities[prev[p]];
                    if (prevAct !== undefined) {
                        prevAct.next.splice(prevAct.next.indexOf(a), 1);
                        for (var n in next) {
                            prevAct.next.push(next[n]);
                        }
                    }
                }
                
                for (var n in next) {
                    var nextAct = activities[next[n]];
                    if (nextAct !== undefined) {
                        nextAct.prev.slice(nextAct.prev.indexOf(a), 1);
                        for (var p in prev) {
                            nextAct.prev.push(prev[p]);
                        }
                    }
                }
                
                removeRoutes.push(a);
            }
        }
        for (var r in removeRoutes) {
            delete activities[removeRoutes[r]];
        }
        
        //Draw future activies
        for (var a in activities) {
            thisObject.createFutureNode(processContainer, pId, activities[a], prefix+pId+"__"+a, actId, prefix);
        }
    },
    
    getNextTransitions : function (processModel, actDefId) {
        var actDefIds = [];
        
        for (var t in processModel.transitions) {
            if (processModel.transitions[t].from === actDefId) {
                actDefIds.push(processModel.transitions[t].to);
            }
        }
        return actDefIds;
    },
    
    createFutureNode : function (processContainer, pId, nodeData, id, lastActId, prefix) {
        var thisObject = this;
        if ($(processContainer).find("#"+id).length === 0) {
            var cssclass = "fnode";
            if (nodeData.model.type === "endNode") {
                cssclass = "fsenode";
            }
            $(processContainer).append("<div class='"+cssclass+" "+nodeData.model.type+"' id='"+id+"'></div>");

            var node = $(processContainer).find("#"+id);
            if (nodeData.model.type !== "endNode" && nodeData.model.type !== "route") {
                var nodeName = nodeData.model.name;
                var pefdid = $(processContainer).data("processdefid");
                if (thisObject.m["plabel."+pefdid+"."+nodeData.model.id] !== undefined) {
                    nodeName = thisObject.m["plabel."+pefdid+"."+nodeData.model.id];
                }
                node.append("<h5 class='node_name'>"+nodeName+"</h5>");
            }
        }

        if (nodeData.prev.length > 0) {
            for (var p in nodeData.prev) {
                var preId = nodeData.prev[p];
                if (preId !== lastActId) {
                    preId = prefix + pId + "__" + preId;
                }
                var exist = false;
                for (var i in this.connections) {
                    if (this.connections[i].source === preId && this.connections[i].target === id) {
                        exist = true;
                        break;
                    }
                }
                
                if (!exist) {
                    this.connections.push({source:preId, target: id, endpointStyle:{ fillStyle: "#999" }, paintStyle: {strokeStyle: "#999", lineWidth: 1, "dashstyle": "2 4"}});
                }
            }
        }
    },

    clear : function () {
        this.clearConnections();
        $(this.canvas).html('');
    },
    
    clearConnections : function() {
        for (var i in this.inst) {
            this.inst[i].unbind();
            this.inst[i].detachEveryConnection();
            this.inst[i].reset();
        }
    },
    
    connectNodes : function() {
        var ps = this;
        var connections = this.connections;
        $(this.canvas).find(".process_container, .subprocess_container").each(function(){
            var pc = this;
            var id = $(pc).attr("id");
            
            for (var i = 0; i < connections.length; i++) {
                var c = connections[i];
                if ($(pc).find("#"+c.source).length > 0) {
                    ps.inst[id].connect(c);
                }
            }
        });
    },

    getSubflowData : function(parentId, version, processId) {
        for (var i = 0; i < this.data.length; i++) {
            var o = this.data[i];
            if (o.status === undefined && o.process.id === processId && ((version !== null && o.process.version === version) || version === null) && o.link.parentId === parentId) {
                return o;
            }
        }
        return null;
    },
    
    getSubflowDataByInstanceID : function(instId) {
        for (var i = 0; i < this.data.length; i++) {
            var o = this.data[i];
            if (o.process.instanceId === instId) {
                return o;
            }
        }
        
        //fallback for process data archive subflow bug, the instId is processDef id
        if (!instId.match(/[0-9]+_.+/gi)) {
            for (var i = 0; i < this.data.length; i++) {
                var o = this.data[i];
                if (o.process.id === instId && o.process.status !== "done") {
                    return o;
                }
            }
        }
        return null;
    },

    getProcessModel : function (processData) {
        var package = this.xpdlModels[processData.packageId + "__" + processData.version];
        return package.processes[processData.id];
    },

    getTransitionModel : function(processModel, id) {
        for (var i = 0; i < processModel.transitions.length; i++) {
            if (processModel.transitions[i].id === id) {
                return processModel.transitions[i];
            }
        }
        return null;
    },

    getStartNode : function(processModel) {
        for (var property in processModel.startEndNodes) {
            if (processModel.startEndNodes[property].type === "start") {
                return processModel.startEndNodes[property];
            }
        }
        return null;
    },

    getActivityModel : function(processModel, actId) {
        return processModel.activities[actId];
    }
};
