ProcessStatusList = function (data, canvas, m, o) {
    this.data = data;
    this.canvas = canvas;
    this.m = m;
    this.o = o;
    var ps = this;
};
ProcessStatusList.prototype = {
    xpdlModels : [],
    data : null,
    canvas : null,
    inst : {},
    
    escapeXPDL: function(string) {
        var str = string;
        str = str.replace(/\&/g, "&amp;");
        str = str.replace(/xpdl\:/g, "");
        return str;
    },
    
    decodeXML: function(value) {
        if (value) {
            return $('<div />').html(value).text();
        } else {
            return '';
        }
    },

    parseXPDL : function(xpdl) {
        var thisObject = this;
        var model = new Object();
        var xml = thisObject.escapeXPDL(xpdl);
        
        // parse XPDL
        var xmlDoc = $.parseXML(xml);
        var $xml = $(xmlDoc);
        var $package = $xml.find("Package");
        
        var processes = {};
        var $processElements = $package.find("WorkflowProcess");
        for (var p = 0; p < $processElements.length; p++) {
            var $processElement = $($processElements[p]);
            var processId = $processElement.attr("Id");
            var processName = $processElement.attr("Name");
            var process = new Object();
            process.name = thisObject.decodeXML(processName);
            processes[processId] = process;

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
                var activity = new Object();
                var activityType = "activity";
                if ($activityElement.find("Route").length > 0) {
                    activityType = "route";
                } else if ($activityElement.find("Tool").length > 0) {
                    activityType = "tool";
                } else if (subflowId) {
                    activityType = "subflow";
                }
                activity.id = activityId;
                activity.name = thisObject.decodeXML(activityName);
                activity.type = activityType;
                activity.subflowId = subflowId;
                
                if($activityElement.find("Join").length > 0 && $activityElement.find("Join").attr("Type") === "AND") {
                    activity.join = "and";
                } else {
                    activity.join = "xor";
                }
                
                process.activities[activityId] = activity;
            }

            // get transitions
            process.transitions = new Array();
            var $transitionElements = $processElement.find("Transition");
            for (var i = 0; i < $transitionElements.length; i++) {
                var $transitionElement = $($transitionElements[i]);
                var transitionId = $transitionElement.attr("Id");
                var transitionFrom = $transitionElement.attr("From");
                var transitionTo = $transitionElement.attr("To");
                var transitionName = $transitionElement.attr("Name");
                var transition = new Object();
                transition.id = transitionId;
                transition.from = transitionFrom;
                transition.to = transitionTo;
                transition.name = (transitionName !== undefined)?transitionName:"";
                process.transitions[i] = transition;
            }
            
            // get start and end nodes
            process.startEndNodes = {};
            var $startEndElements = $processElement.find("ExtendedAttribute[Name='JaWE_GRAPH_START_OF_WORKFLOW'], ExtendedAttribute[Name='JaWE_GRAPH_END_OF_WORKFLOW']");
            for (var i = 0; i < $startEndElements.length; i++) {
                // get node values
                var $startEndElement = $($startEndElements[i]);
                var activityId;
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
                        break;
                    }
                }
                var startEnd = new Object();
                startEnd.id = activityId;
                startEnd.type = type;
                process.startEndNodes[startEnd.type + "_" + activityId] = startEnd;
            }
        }
        model.processes = processes;
        return model;
    },
    
    loadXpdl : function(id, xpdl) {
        var model = this.parseXPDL(xpdl);
        this.xpdlModels[id] = model;
    },

    draw : function () {
        var thisObject = this;
        this.clear();
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].status === undefined) {
                this.drawProcess(this.data[i]);
            }
        }
        
        if (this.o.showSkippedActivities !== "true") {
            $(".node.skipped").addClass("hidden_node");
        }
        if (this.o.showFutureActivities !== "true") {
            $(".node.notstarted").addClass("hidden_node");
        }
        
        if (this.o.showSkippedActivities !== "true" || this.o.showFutureActivities !== "true") {
            $(this.canvas).find("ul").each(function(){
                if ($(this).find("> li.node:not(.hidden_node)").length === 1) {
                    $(this).parent("li").find("> .progress_bar").hide();
                }
                $(this).find("> li.node:not(.hidden_node)").first().addClass("first");
                $(this).find("> li.node:not(.hidden_node)").last().addClass("last");
            });
        }
        
        if (this.o.clickCallback !== undefined) {
            $(this.canvas).find(".act_node.inprogress, .act_node.completed").addClass("clickable").on("click", function(){
                var act = $(this).data("act_details");
                thisObject.o.clickCallback(act);
            });
        }
        
        $(this.canvas).addClass("draw_completed");
    },

    drawProcess : function(processData, processContainer) {
        processData.status = "drawing";
        var thisObject = this;
        var pId = processData.process.id;
        var pInstId = processData.process.instanceId;
        
        var migratedProcessData = null;
        var isMigrated = false;
        if ("closed.aborted" === processData.process.state) {
            migratedProcessData = thisObject.getSubflowData(processData.process.instanceId, null, pId);
            if (migratedProcessData !== null) {
                isMigrated = true;
            }
        }
        
        var processModel = this.getProcessModel(processData.process, pId);
        
        if (processContainer === undefined || processContainer === null) {
            processContainer = this.createProcessContainer(processData, processModel);
            processContainer = $(processContainer).find("> ul");
        }
        
        var paths = thisObject.buildProcessPath(processData.process, processModel);
        thisObject.drawActivities(paths.nodes, paths.paths, $(processContainer), pId, pInstId);
        
        //fill data
        thisObject.fillData(processData, paths.nodes, paths.paths, $(processContainer), pId, pInstId, "", isMigrated);
        
        //mark subflow as done
        for (var n in paths.nodes) {
            if (paths.nodes[n].type === "subflow") {
                var subflowData = thisObject.getSubflowData(processData.process.instanceId, processData.process.version, paths.nodes[n].subflowId);
                if (subflowData !== null && subflowData !== undefined) {
                    subflowData.status = "done";
                }
            }
        }
        
        //draw migrated Process Data
        if (migratedProcessData !== null) {
            thisObject.drawProcess(migratedProcessData, $(processContainer));
        }
        
        processData.status = "done";
    },
    
    drawActivities : function(nodes, paths, processContainer, pId, pInstId) {
        var thisObject = this;
        for (var p in paths) {
            var path = paths[p];
            
            if (path.name === "start" && $(processContainer).find("[data-actid='start']").length > 0) {
                continue;
            }
            
            var model = nodes[path.name];
            
            if (model === undefined) {
                continue;
            }
            
            thisObject.drawActivity(path, model, nodes, paths, processContainer, pId, pInstId);
        }
    },
    
    drawActivity : function (path, model, nodes, paths, processContainer, pId, pInstId) {
        var thisObject = this;
        
        var meta = "";
        if (model.type === "subflow") {
            meta = "data-subflow=\""+model.subflowId+"\"";
        }
        var nodeLabel = ((model.name !== "")?model.name:"&nbsp;");
        if (thisObject.m["plabel."+pId+"."+path.name] !== undefined) {
            nodeLabel = thisObject.m["plabel."+pId+"."+path.name];
        }
        var el = $("<li class=\"node\" data-pid=\""+pInstId+"\" data-actId=\""+path.name+"\" "+meta+" data-decision=\""+path.decisionNode+"\"><div class=\"node_label\">"+nodeLabel+"</div></li>");
        $(processContainer).append(el);
        if (path.paths.length > 0) {
            $(el).append("<div class=\"progress_bar\"><div class=\"bar\"></div><div class=\"bar_label\">0%</div></div>");
            $(el).append("<ul></ul>");
            thisObject.drawActivities(nodes, path.paths, $(el).find("> ul"), pId, pInstId);
            $(el).addClass("child_path");
        } else {
            $(el).append("<div class=\"node_user\"><span class=\"meta_label\"></span><span class=\"meta_value\"></span></div><div class=\"node_date\"><span class=\"meta_label\"></span><span class=\"meta_value\"></span></div><div class=\"node_status\"></div>");
            $(el).addClass("act_node");
        }
    },
    
    fillData : function(processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated) {
        var thisObject = this;
        
        var prev = null;
        if ($(processContainer).find("[data-actid='start']:not(.has_status)").length > 0) {
            var start = {
                activityDefId : "start",
                state : "closed.completed",
                acceptedUser : processData.process.requesterId,
                finishTime : processData.process.createdTime
            };
            thisObject.fillActData(start, null, processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated);
            prev = start;
        }

        for (var a in processData.activities) {
            var act = processData.activities[a];
            if (thisObject.fillActData(act, prev, processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated)) {
                prev = act;
            }
        }
        
        if (isMigrated) {
            $(processContainer).append("<li class=\"message migrated\"><span>"+thisObject.m["msg.migrated"]+"</span></li>");
        } else {
            thisObject.drawActivity({
                name : "end",
                paths : []
            }, {
                id : "end",
                name : thisObject.m["label.end"],
                type : "end"
            }, nodes, paths, processContainer, pId, pInstId);
            
            if (processData.process.state === "closed.completed") {
                thisObject.fillActData({
                    activityDefId : "end",
                    state : "closed.completed",
                    acceptedUser : prev.acceptedUser,
                    finishTime : prev.finishTime
                }, null, processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated);
            } else if (processData.process.state === "closed.aborted") {
                thisObject.fillActData({
                    activityDefId : "end",
                    state : "closed.aborted",
                    acceptedUser : prev.acceptedUser,
                    finishTime : prev.finishTime
                }, null, processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated);
                $(processContainer).parent().find("> .progress_bar").addClass("aborted");
            }
        }
        
        thisObject.updateParentNodes(processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated);
        thisObject.updateRemainingNodes(processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated);
        if (!isMigrated) {
            thisObject.updateProgress(processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated);
        }
    },
    
    fillActData : function(act, prev, processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated) {
        var thisObject = this;
        var node = $(processContainer).find("[data-pid='"+pInstId+"'][data-actid='"+prefix+act.activityDefId+"']");
        if (node.length > 0) { //is activity
            var buildLoopPath = false;
            var parentUl = $(node).closest("ul");
            node = node.filter(":not(.has_status)");
            if (node.length > 0) {
                if (node.next().hasClass("has_status")) {
                    thisObject.skipNodePath($(node));
                    buildLoopPath = true;
                }
            } else {
                buildLoopPath = true;
            }
            
            if (!buildLoopPath) {
                var cssClass = "";
                
                if ($(node).data("subflow") !== undefined && $(node).data("subflow") !== "") {
                    var subflowData = this.getSubflowDataByInstanceID(act.subflow_instance_id);
                    var prev = null;
                    for (var a in subflowData.activities) {
                        var sact = subflowData.activities[a];
                        thisObject.fillActData(sact, prev, processData, nodes, paths, processContainer, pId, pInstId, prefix+act.activityDefId+"_", isMigrated);
                        prev = act;
                    }
                    subflowData.status = "done";
                }
                
                $(node).find("> .node_label").text(act.name);
                
                if (act.state === "closed.completed") {
                    $(node).find("> .node_user .meta_label").text(thisObject.m["label.by"]+" ");
                    $(node).find("> .node_user .meta_value").text(act.acceptedUser);
                    $(node).find("> .node_date .meta_label").text(thisObject.m["label.on"]+" ");
                    $(node).find("> .node_date .meta_value").text(act.finishTime);
                    $(node).find("> .node_status").text(thisObject.m["status.completed"]);
                    cssClass = "completed";
                } else if (act.state === "closed.terminated") {
                    $(node).find("> .node_status").text(thisObject.m["status.terminated"]);
                    cssClass = "completed terminated";
                } else if (act.state.indexOf("open") !== -1) {
                    if (act.acceptedUser !== null && act.acceptedUser !== undefined && act.acceptedUser !== "") {
                        $(node).find("> .node_user .meta_label").text(thisObject.m["label.acceptedUser"]+": ");
                        $(node).find("> .node_user .meta_value").text(act.acceptedUser);
                        
                        var performers = act.acceptedUser.split(", ");
                        var newAssignee = act.assignmentUsers.filter(function(value, index){
                            return performers.indexOf(value) === -1;
                        });
                        
                        $(node).find("> .node_user").after('<div class=\"node_user node_user2\"><span class=\"meta_label\"></span><span class=\"meta_value\"></span></div>');
                        $(node).find("> .node_user2 .meta_label").text(thisObject.m["label.listOfPending"]+": ");
                        $(node).find("> .node_user2 .meta_value").text(newAssignee.join(', '));
                    } else {
                        $(node).find("> .node_user .meta_label").text(thisObject.m["label.to"]+" ");
                        $(node).find("> .node_user .meta_value").text(act.assignmentUsers.join(', '));
                    }
                    
                    if (act.duedate !== undefined) {
                        $(node).find("> .node_date .meta_label").text(thisObject.m["label.eta"]+" ");
                        $(node).find("> .node_date .meta_value").text(act.duedate);
                    }
                    $(node).find("> .node_status").text(thisObject.m["status.inprogress"]);
                    cssClass = "inprogress";
                } else if (act.activityDefId === "end" && act.state === "closed.aborted") {
                    $(node).find("> .node_status").text(thisObject.m["status.withdrawn"]);
                    cssClass = "withdrawn";
                } else if (act.state === "closed.aborted") {
                    return;
                }

                act.process = processData.process;
                $(node).data("act_details", act);
                $(node).addClass("has_status " +cssClass);
                
                $(node).attr("id", act.id);
                
                return true;
            } else { // loop exist
                var prevNode = $(processContainer).find("#"+prev.id);
                if ($(prevNode).data("actid") === act.activityDefId) {
                    if (act.state === "closed.terminated") {
                        var model = nodes[prefix+act.activityDefId];
                        if (!$(processContainer).find("#"+prev.id).next().hasClass("loopmsg")) {
                            $(processContainer).find("#"+prev.id).after("<li class=\"message loopmsg\" data-count=\"1\" ><span>"+(thisObject.m["msg.loopAct"].replace("{actName}", model.name).replace("{count}", 1))+"</span></li>");
                        } else {
                            var lmsg = (processContainer).find("#"+prev.id).next();
                            var count = $(lmsg).data("count") + 1;
                            $(lmsg).find('> span').html((thisObject.m["msg.loopAct"].replace("{actName}", model.name).replace("{count}", count)));
                            $(lmsg).data("count", count);
                        }
                        
                        return false;
                    } else {
                        var msg;
                        if ($(processContainer).find("#"+prev.id).next().hasClass("loopmsg")) {
                            msg = (processContainer).find("#"+prev.id).next();
                        } else {
                            var model = nodes[prefix+act.activityDefId];
                            $(processContainer).find("#"+prev.id).after("<li class=\"message reroute\"><span>"+(thisObject.m["msg.backToAct"].replace("{actName}", model.name))+"</span></li>");
                            msg = (processContainer).find("#"+prev.id).next();
                        }
                        
                        var cloneAct = $(prevNode).clone();
                        $(cloneAct).attr("class", "node act_node");
                        $(cloneAct).removeAttr("id");
                        $(msg).after(cloneAct);
                        
                        return thisObject.fillActData(act, prev, processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated);
                    }
                } else {
                    var findLoopPaths = function(currentPaths) {
                        for (var p in currentPaths) {
                            if (currentPaths[p].name === prefix+act.activityDefId) {
                                return currentPaths;
                            } else {
                                if (currentPaths[p].paths.length > 0) {
                                    var result = findLoopPaths(currentPaths[p].paths);
                                    if (result !== null) {
                                        return result;
                                    }
                                }
                            }
                        }
                        return null;
                    };
                    var foundPaths = findLoopPaths(paths);
                    var loopPaths = [];
                    var found = false;
                    for (var l in foundPaths) {
                        if (foundPaths[l].name === prefix+act.activityDefId || found) {
                            loopPaths.push(foundPaths[l]);
                            found = true;
                        } else {
                            continue;
                        }
                    }

                    //insert loop message
                    var model = nodes[prefix+act.activityDefId];
                    $(processContainer).find("#"+prev.id).after("<li class=\"message reroute\"><span>"+(thisObject.m["msg.backToAct"].replace("{actName}", model.name))+"</span></li>");

                    //clean data for loop
                    $(processContainer).find("#"+prev.id).nextAll(".node:not(.has_status)").each(function(){
                        thisObject.skipNodePath($(this));
                    });
                    $(parentUl).find("> li.node:not(.has_status)").each(function(){
                        thisObject.skipNodePath($(this));
                    });
                    
                    //draw loop path
                    thisObject.drawActivities(nodes, loopPaths, parentUl, pId, pInstId);
                    
                    //fill data
                    return thisObject.fillActData(act, prev, processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated);
                }
            }
            return false;
        }
    },
    
    skipNodePath : function(node) {
        var thisObject = this;
        if ($(node).find(".has_status").length > 0) {
            return;
        }
        $(node).find("> .node_status").text(thisObject.m["status.skipped"]);
        $(node).addClass("has_status skipped");
        
        $(node).find("> ul > li.node:not(.has_status)").each(function(){
            thisObject.skipNodePath($(this));
        });
    },
    
    notStartedNodePath : function(node) {
        var thisObject = this;
        $(node).find("> .node_status").text(thisObject.m["status.notstarted"]);
        $(node).addClass("has_status notstarted");
        
        $(node).find("> ul > li.node:not(.has_status)").each(function(){
            thisObject.notStartedNodePath($(this));
        });
    },
    
    updateParentNodes : function (processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated) {
        $(processContainer).find("li.node.inprogress").parents("li").addClass("has_status inprogress");
        
        $(processContainer).find("li.child_path").each(function(){
            if($(this).find("li.node.inprogress").length === 0 && $(this).find("li.node.completed").length > 0) {
                $(this).addClass("has_status completed");
            }
        });
    },
    
    updateRemainingNodes : function (processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated) {
        var thisObject = this;
    
        var inProgressNode =  $(processContainer).find("> li.node.inprogress");
        if ($(inProgressNode).length > 0) {
            inProgressNode = $(inProgressNode).last();
            $(inProgressNode).nextAll("li.node").each(function(){
                if (!$(this).hasClass("has_status")) {
                    if ($(this).data("decision") !== "") {
                        if (!$(this).hasClass('has_status')) {
                            var hasStatus = false;
                            $(this).parent().find("> li.node[data-decision='"+$(this).data("decision")+"']").each(function(){
                                if($(this).hasClass("inprogress") || $(this).hasClass("completed")) {
                                    hasStatus = true;
                                }
                            });
                            if (hasStatus) {
                                thisObject.skipNodePath($(this));
                            } else {
                                thisObject.notStartedNodePath($(this));
                            }
                        }
                    } else {
                        thisObject.notStartedNodePath($(this));
                    }
                }
            });
        }
        
        $(processContainer).find("> li.node:not(.has_status)").each(function(){
            thisObject.skipNodePath($(this));
        });
        
        $(processContainer).find("> li.node > ul").each(function(){
            thisObject.updateRemainingNodes(processData, nodes, paths, $(this), pId, pInstId, prefix, isMigrated);
        });
    },
    
    updateProgress : function(processData, nodes, paths, processContainer, pId, pInstId, prefix, isMigrated) {
        var thisObject = this;
        
        $(processContainer).find("> li.node > ul").each(function(){
            thisObject.updateProgress(processData, nodes, paths, $(this), pId, pInstId, prefix, isMigrated);
        });
        
        var parent = $(processContainer).parent();
        if (!parent.hasClass("skipped")) {
            var total = $(processContainer).find("> li.node:not(.skipped)").filter(':not([data-actid="start"])').filter(':not([data-actid="end"])').length;
            var completed = $(processContainer).find("> li.node.completed:not(.skipped)").filter(':not([data-actid="start"])').filter(':not([data-actid="end"])').length;
            var inProgress = 0;
            $(processContainer).find("> li.child_path.inprogress").each(function(){
                var precentage = $(this).find("> .progress_bar").data("precentage");
                inProgress += (precentage/100);
            });
            var result = Math.floor((completed+inProgress)/total * 100);
            if (isNaN(result)) {
                result = 0;
            }
            
            $(parent).find("> .progress_bar").data("precentage", result);
            $(parent).find("> .progress_bar .bar").css("width", result + "%");
            $(parent).find("> .progress_bar .bar_label").text(result + "%");
            if (result >= 60) {
                $(parent).find("> .progress_bar").addClass("revert");
            }
        }
    },
    
    buildProcessPath : function(processPackage, processModel) {
        var thisObject = this;
        var returnObj = {
            nodes : {},
            paths : []
        };
        var startNode = thisObject.getStartNode(processModel);
        returnObj.nodes["start"] = {
            id : "start",
            name : thisObject.m["label.started"],
            type : "start"
        };
        returnObj.paths.push({
            name : "start",
            decisionNode : "",
            paths : [],
            parent : returnObj
        });
        
        var findRootParent = function(tempParent) {
            if (returnObj.nodes[tempParent.name] === undefined && tempParent.parent !== undefined) {
                tempParent = findRootParent(tempParent.parent);
            }
            return tempParent;
        };
        
        var buildPath = function(actId, pm, current, parent, prefix) {
            var currentPaths = current.paths;
            var parentPaths = parent.paths;
            
            if (prefix === undefined || prefix === null) {
                prefix = "";
            }
            
            if (returnObj.nodes[prefix+actId] === undefined) {
                var model = thisObject.getActivityModel(pm, actId);
                var nexts = thisObject.getNextTransitions(pm, actId);
                var prevs = thisObject.getPrevTransitions(pm, actId);
                
                returnObj.nodes[prefix+actId] = model;
                returnObj.nodes[prefix+actId].prevs = prevs;
                returnObj.nodes[prefix+actId].nexts = nexts;
                returnObj.nodes[prefix+actId].prefix = prefix;
                returnObj.nodes[prefix+actId].id = prefix + returnObj.nodes[prefix+actId].id;
                
                if (model.type === "activity") {
                    currentPaths.push({
                        name : prefix+actId,
                        decisionNode : "",
                        paths : [],
                        parent : current
                    });
                } else if (model.type === "subflow") {
                    var subflow = {
                        name : prefix+actId,
                        decisionNode : "",
                        paths : [],
                        parent : current
                    };
                    
                    var subflowProcessModel = thisObject.getProcessModel(processPackage, model.subflowId);
                    var subflowStartNode = thisObject.getStartNode(subflowProcessModel);
                    buildPath(subflowStartNode.id, subflowProcessModel, subflow, parent, prefix+actId + "_");
                    
                    if (subflow.paths.length > 0) {
                        currentPaths.push(subflow);
                    }
                }
                
                if (nexts.length > 0) {
                    var tempTransitionPaths = [];
                    for (var i in nexts) {
                        var t = {
                            tmodel : {
                                id : prefix+nexts[i].id,
                                name : nexts[i].name,
                                type : "transition"
                            },
                            tpath : {
                                decisionNode : prefix+actId,
                                name : prefix+nexts[i].id,
                                paths : [],
                                parent : current
                            }
                        };
                        buildPath(nexts[i].to, pm, t.tpath, current, prefix);

                        if (t.tpath.paths.length > 0) {
                            tempTransitionPaths.push(t);
                        }
                    }
                    
                    if (model.join === "and") {
                        parent = findRootParent(parent);
                        
                        if (parent.waitingQueue === undefined) {
                            parent.waitingQueue = [];
                        }
                        if (tempTransitionPaths.length > 1) {
                            for (var temp in tempTransitionPaths) {
                                returnObj.nodes[tempTransitionPaths[temp].tmodel.id] = tempTransitionPaths[temp].tmodel;
                                parent.waitingQueue.push(tempTransitionPaths[temp].tpath);
                            }
                        } else if (tempTransitionPaths.length === 1){
                            for (var n in tempTransitionPaths[0].tpath.paths) {
                                parent.waitingQueue.push(tempTransitionPaths[0].tpath.paths[n]);
                            }
                        }
                    } else {
                        if (tempTransitionPaths.length > 1) {
                            for (var temp in tempTransitionPaths) {
                                returnObj.nodes[tempTransitionPaths[temp].tmodel.id] = tempTransitionPaths[temp].tmodel;
                                currentPaths.push(tempTransitionPaths[temp].tpath);
                            }
                        } else if (tempTransitionPaths.length === 1){
                            for (var n in tempTransitionPaths[0].tpath.paths) {
                                tempTransitionPaths[0].tpath.paths[n].parent = current;
                                currentPaths.push(tempTransitionPaths[0].tpath.paths[n]);
                            }
                            if (tempTransitionPaths[0].tpath.waitingQueue !== undefined) {
                                if (current.waitingQueue === undefined) {
                                    current.waitingQueue = [];
                                }
                                current.waitingQueue = current.waitingQueue.concat(tempTransitionPaths[0].tpath.waitingQueue);
                            }   
                        }
                    }
                }
            }
        };
        buildPath(startNode.id, processModel, returnObj, returnObj);
        
        var newRenderedNode = [];
        var travelWaitingQueue = function (current) {
            if (current.waitingQueue !== undefined) {
                while (current.waitingQueue.length > 0) {
                    var node = current.waitingQueue.shift();
                    var parent = current;
                    if (parent.parent !== undefined) {
                        parent = parent.parent;
                    }
                    node.parent = parent;
                    parent.paths.push(node);
                    newRenderedNode.push(node);
                }
            }
            
            for (var i in current.paths) {
                travelWaitingQueue(current.paths[i]);
            }
        };
        travelWaitingQueue(returnObj);
        while (newRenderedNode.length > 0) {
            travelWaitingQueue(newRenderedNode.shift());
        }
        
        return returnObj;
    },

    createProcessContainer : function (processData, processModel) {
        $(this.canvas).prepend("<div id=\""+processData.process.instanceId+"\" class=\"process_container\"><ul></ul></div>");
        var container = $(this.canvas).find("#"+processData.process.instanceId);
        $(container).prepend("<div class=\"progress_bar\"><div class=\"bar\"></div><div class=\"bar_label\">0%</div></div>");
        
        if (this.o.showProcessName !== undefined && this.o.showProcessName !== null && this.o.showProcessName === "true") {
            $(container).prepend("<h2 class=\"process_title\">"+processData.process.name+"</h2>");
        } else {
            $(container).prepend("<h2 class=\"process_title\">&nbsp;</h2>");
        }
        
        return container;
    },
    
    clear : function () {
        $(this.canvas).html("");
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
    
    getNextTransitions : function (processModel, actDefId) {
        var transitions = [];
        
        for (var t in processModel.transitions) {
            if (processModel.transitions[t].from === actDefId) {
                transitions.push(processModel.transitions[t]);
            }
        }
        return transitions;
    },
    
    getPrevTransitions : function (processModel, actDefId) {
        var transitions = [];
        
        for (var t in processModel.transitions) {
            if (processModel.transitions[t].to === actDefId) {
                transitions.push(processModel.transitions[t]);
            }
        }
        return transitions;
    },
    
    getProcessModel : function (processData, processId) {
        var package = this.xpdlModels[processData.packageId + "__" + processData.version];
        return package.processes[processId];
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
