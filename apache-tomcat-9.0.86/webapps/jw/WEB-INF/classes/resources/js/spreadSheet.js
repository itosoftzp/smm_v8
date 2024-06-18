JSpreadShetFormDataLoader = {
    url : '',
    cache : {},
    load : function (formDefId, primaryKey, field) {
        if (JSpreadShetFormDataLoader.cache[formDefId + "::" + primaryKey] !== undefined) {
            var value = JSpreadShetFormDataLoader.cache[formDefId + "::" + primaryKey][field];
            if (value === null || value === undefined) {
                value = "";
            }
            return value;
        } else {
            var value = "";
            $.ajax({
                type: "POST",
                data: {
                    "_a" : "loadFormData",
                    "_formDefId" : formDefId,
                    "_primaryKey" : primaryKey
                },
                url: JSpreadShetFormDataLoader.url,
                async: false,
                dataType: "json",
                success: function (result) {
                    JSpreadShetFormDataLoader.cache[formDefId + "::" + primaryKey] = result;
                    value = result[field];
                }
            });
            if (value === null || value === undefined) {
                value = "";
            }
            return value;
        }
    }
};
(function (Handsontable) {
    var uploadId = "fileUploadInput";
    var FileUploadEditor = Handsontable.editors.TextEditor.prototype.extend();
    
    var typemap = {"ez":"application/andrew-inset","aw":"application/applixware","atom":"application/atom+xml","atomcat":"application/atomcat+xml","atomsvc":"application/atomsvc+xml","bdoc":"application/bdoc","ccxml":"application/ccxml+xml","cdmia":"application/cdmi-capability","cdmic":"application/cdmi-container","cdmid":"application/cdmi-domain","cdmio":"application/cdmi-object","cdmiq":"application/cdmi-queue","cu":"application/cu-seeme","mpd":"application/dash+xml","davmount":"application/davmount+xml","dbk":"application/docbook+xml","dssc":"application/dssc+der","xdssc":"application/dssc+xml","ecma":"application/ecmascript","emma":"application/emma+xml","epub":"application/epub+zip","exi":"application/exi","pfr":"application/font-tdpfr","woff":"application/font-woff","woff2":"application/font-woff2","geojson":"application/geo+json","gml":"application/gml+xml","gpx":"application/gpx+xml","gxf":"application/gxf","gz":"application/gzip","hjson":"application/hjson","stk":"application/hyperstudio","ink":"application/inkml+xml","inkml":"application/inkml+xml","ipfix":"application/ipfix","jar":"application/java-archive","war":"application/java-archive","ear":"application/java-archive","ser":"application/java-serialized-object","class":"application/java-vm","js":"application/javascript","mjs":"application/javascript","json":"application/json","map":"application/json","json5":"application/json5","jsonml":"application/jsonml+json","jsonld":"application/ld+json","lostxml":"application/lost+xml","hqx":"application/mac-binhex40","cpt":"application/mac-compactpro","mads":"application/mads+xml","webmanifest":"application/manifest+json","mrc":"application/marc","mrcx":"application/marcxml+xml","ma":"application/mathematica","nb":"application/mathematica","mb":"application/mathematica","mathml":"application/mathml+xml","mbox":"application/mbox","mscml":"application/mediaservercontrol+xml","metalink":"application/metalink+xml","meta4":"application/metalink4+xml","mets":"application/mets+xml","mods":"application/mods+xml","m21":"application/mp21","mp21":"application/mp21","mp4s":"application/mp4","m4p":"application/mp4","doc":"application/msword","dot":"application/msword","mxf":"application/mxf","bin":"application/octet-stream","dms":"application/octet-stream","lrf":"application/octet-stream","mar":"application/octet-stream","so":"application/octet-stream","dist":"application/octet-stream","distz":"application/octet-stream","pkg":"application/octet-stream","bpk":"application/octet-stream","dump":"application/octet-stream","elc":"application/octet-stream","deploy":"application/octet-stream","exe":"application/octet-stream","dll":"application/octet-stream","deb":"application/octet-stream","dmg":"application/octet-stream","iso":"application/octet-stream","img":"application/octet-stream","msi":"application/octet-stream","msp":"application/octet-stream","msm":"application/octet-stream","buffer":"application/octet-stream","oda":"application/oda","opf":"application/oebps-package+xml","ogx":"application/ogg","omdoc":"application/omdoc+xml","onetoc":"application/onenote","onetoc2":"application/onenote","onetmp":"application/onenote","onepkg":"application/onenote","oxps":"application/oxps","xer":"application/patch-ops-error+xml","pdf":"application/pdf","pgp":"application/pgp-encrypted","asc":"application/pgp-signature","sig":"application/pgp-signature","prf":"application/pics-rules","p10":"application/pkcs10","p7m":"application/pkcs7-mime","p7c":"application/pkcs7-mime","p7s":"application/pkcs7-signature","p8":"application/pkcs8","ac":"application/pkix-attr-cert","cer":"application/pkix-cert","crl":"application/pkix-crl","pkipath":"application/pkix-pkipath","pki":"application/pkixcmp","pls":"application/pls+xml","ai":"application/postscript","eps":"application/postscript","ps":"application/postscript","pskcxml":"application/pskc+xml","raml":"application/raml+yaml","rdf":"application/rdf+xml","rif":"application/reginfo+xml","rnc":"application/relax-ng-compact-syntax","rl":"application/resource-lists+xml","rld":"application/resource-lists-diff+xml","rs":"application/rls-services+xml","gbr":"application/rpki-ghostbusters","mft":"application/rpki-manifest","roa":"application/rpki-roa","rsd":"application/rsd+xml","rss":"application/rss+xml","rtf":"application/rtf","sbml":"application/sbml+xml","scq":"application/scvp-cv-request","scs":"application/scvp-cv-response","spq":"application/scvp-vp-request","spp":"application/scvp-vp-response","sdp":"application/sdp","setpay":"application/set-payment-initiation","setreg":"application/set-registration-initiation","shf":"application/shf+xml","smi":"application/smil+xml","smil":"application/smil+xml","rq":"application/sparql-query","srx":"application/sparql-results+xml","gram":"application/srgs","grxml":"application/srgs+xml","sru":"application/sru+xml","ssdl":"application/ssdl+xml","ssml":"application/ssml+xml","tei":"application/tei+xml","teicorpus":"application/tei+xml","tfi":"application/thraud+xml","tsd":"application/timestamped-data","vxml":"application/voicexml+xml","wasm":"application/wasm","wgt":"application/widget","hlp":"application/winhlp","wsdl":"application/wsdl+xml","wspolicy":"application/wspolicy+xml","xaml":"application/xaml+xml","xdf":"application/xcap-diff+xml","xenc":"application/xenc+xml","xhtml":"application/xhtml+xml","xht":"application/xhtml+xml","xml":"application/xml","xsl":"application/xml","xsd":"application/xml","rng":"application/xml","dtd":"application/xml-dtd","xop":"application/xop+xml","xpl":"application/xproc+xml","xslt":"application/xslt+xml","xspf":"application/xspf+xml","mxml":"application/xv+xml","xhvml":"application/xv+xml","xvml":"application/xv+xml","xvm":"application/xv+xml","yang":"application/yang","yin":"application/yin+xml","zip":"application/zip","3gpp":"audio/3gpp","adp":"audio/adpcm","au":"audio/basic","snd":"audio/basic","mid":"audio/midi","midi":"audio/midi","kar":"audio/midi","rmi":"audio/midi","mp3":"audio/mp3","m4a":"audio/mp4","mp4a":"audio/mp4","mpga":"audio/mpeg","mp2":"audio/mpeg","mp2a":"audio/mpeg","mp3":"audio/mpeg","m2a":"audio/mpeg","m3a":"audio/mpeg","oga":"audio/ogg","ogg":"audio/ogg","spx":"audio/ogg","s3m":"audio/s3m","sil":"audio/silk","wav":"audio/wav","wav":"audio/wave","weba":"audio/webm","xm":"audio/xm","ttc":"font/collection","otf":"font/otf","ttf":"font/ttf","woff":"font/woff","woff2":"font/woff2","apng":"image/apng","bmp":"image/bmp","cgm":"image/cgm","g3":"image/g3fax","gif":"image/gif","ief":"image/ief","jp2":"image/jp2","jpg2":"image/jp2","jpeg":"image/jpeg","jpg":"image/jpeg","jpe":"image/jpeg","jpm":"image/jpm","jpx":"image/jpx","jpf":"image/jpx","ktx":"image/ktx","png":"image/png","sgi":"image/sgi","svg":"image/svg+xml","svgz":"image/svg+xml","tiff":"image/tiff","tif":"image/tiff","webp":"image/webp","eml":"message/rfc822","mime":"message/rfc822","gltf":"model/gltf+json","glb":"model/gltf-binary","igs":"model/iges","iges":"model/iges","msh":"model/mesh","mesh":"model/mesh","silo":"model/mesh","wrl":"model/vrml","vrml":"model/vrml","x3db":"model/x3d+binary","x3dbz":"model/x3d+binary","x3dv":"model/x3d+vrml","x3dvz":"model/x3d+vrml","x3d":"model/x3d+xml","x3dz":"model/x3d+xml","appcache":"text/cache-manifest","manifest":"text/cache-manifest","ics":"text/calendar","ifb":"text/calendar","coffee":"text/coffeescript","litcoffee":"text/coffeescript","css":"text/css","csv":"text/csv","html":"text/html","htm":"text/html","shtml":"text/html","jade":"text/jade","jsx":"text/jsx","less":"text/less","markdown":"text/markdown","md":"text/markdown","mml":"text/mathml","n3":"text/n3","txt":"text/plain","text":"text/plain","conf":"text/plain","def":"text/plain","list":"text/plain","log":"text/plain","in":"text/plain","ini":"text/plain","rtx":"text/richtext","rtf":"text/rtf","sgml":"text/sgml","sgm":"text/sgml","shex":"text/shex","slim":"text/slim","slm":"text/slim","stylus":"text/stylus","styl":"text/stylus","tsv":"text/tab-separated-values","t":"text/troff","tr":"text/troff","roff":"text/troff","man":"text/troff","me":"text/troff","ms":"text/troff","ttl":"text/turtle","uri":"text/uri-list","uris":"text/uri-list","urls":"text/uri-list","vcard":"text/vcard","vtt":"text/vtt","xml":"text/xml","yaml":"text/yaml","yml":"text/yaml","3gp":"video/3gpp","3gpp":"video/3gpp","3gpp":"video/3gpp","3g2":"video/3gpp2","h261":"video/h261","h263":"video/h263","h264":"video/h264","jpgv":"video/jpeg","jpm":"video/jpm","jpgm":"video/jpm","mj2":"video/mj2","mjp2":"video/mj2","ts":"video/mp2t","mp4":"video/mp4","mp4v":"video/mp4","mpg4":"video/mp4","mpeg":"video/mpeg","mpg":"video/mpeg","mpe":"video/mpeg","m1v":"video/mpeg","m2v":"video/mpeg","ogv":"video/ogg","qt":"video/quicktime","mov":"video/quicktime","webm":"video/webm","cww":"application/prs.cww","plb":"application/vnd.3gpp.pic-bw-large","psb":"application/vnd.3gpp.pic-bw-small","pvb":"application/vnd.3gpp.pic-bw-var","tcap":"application/vnd.3gpp2.tcap","pwn":"application/vnd.3m.post-it-notes","aso":"application/vnd.accpac.simply.aso","imp":"application/vnd.accpac.simply.imp","acu":"application/vnd.acucobol","atc":"application/vnd.acucorp","acutc":"application/vnd.acucorp","air":"application/vnd.adobe.air-application-installer-package+zip","fcdt":"application/vnd.adobe.formscentral.fcdt","fxp":"application/vnd.adobe.fxp","fxpl":"application/vnd.adobe.fxp","xdp":"application/vnd.adobe.xdp+xml","xfdf":"application/vnd.adobe.xfdf","ahead":"application/vnd.ahead.space","azf":"application/vnd.airzip.filesecure.azf","azs":"application/vnd.airzip.filesecure.azs","azw":"application/vnd.amazon.ebook","acc":"application/vnd.americandynamics.acc","ami":"application/vnd.amiga.ami","apk":"application/vnd.android.package-archive","cii":"application/vnd.anser-web-certificate-issue-initiation","fti":"application/vnd.anser-web-funds-transfer-initiation","atx":"application/vnd.antix.game-component","mpkg":"application/vnd.apple.installer+xml","m3u8":"application/vnd.apple.mpegurl","pkpass":"application/vnd.apple.pkpass","swi":"application/vnd.aristanetworks.swi","iota":"application/vnd.astraea-software.iota","aep":"application/vnd.audiograph","mpm":"application/vnd.blueice.multipass","bmi":"application/vnd.bmi","rep":"application/vnd.businessobjects","cdxml":"application/vnd.chemdraw+xml","mmd":"application/vnd.chipnuts.karaoke-mmd","cdy":"application/vnd.cinderella","cla":"application/vnd.claymore","rp9":"application/vnd.cloanto.rp9","c4g":"application/vnd.clonk.c4group","c4d":"application/vnd.clonk.c4group","c4f":"application/vnd.clonk.c4group","c4p":"application/vnd.clonk.c4group","c4u":"application/vnd.clonk.c4group","c11amc":"application/vnd.cluetrust.cartomobile-config","c11amz":"application/vnd.cluetrust.cartomobile-config-pkg","csp":"application/vnd.commonspace","cdbcmsg":"application/vnd.contact.cmsg","cmc":"application/vnd.cosmocaller","clkx":"application/vnd.crick.clicker","clkk":"application/vnd.crick.clicker.keyboard","clkp":"application/vnd.crick.clicker.palette","clkt":"application/vnd.crick.clicker.template","clkw":"application/vnd.crick.clicker.wordbank","wbs":"application/vnd.criticaltools.wbs+xml","pml":"application/vnd.ctc-posml","ppd":"application/vnd.cups-ppd","car":"application/vnd.curl.car","pcurl":"application/vnd.curl.pcurl","dart":"application/vnd.dart","rdz":"application/vnd.data-vision.rdz","uvf":"application/vnd.dece.data","uvvf":"application/vnd.dece.data","uvd":"application/vnd.dece.data","uvvd":"application/vnd.dece.data","uvt":"application/vnd.dece.ttml+xml","uvvt":"application/vnd.dece.ttml+xml","uvx":"application/vnd.dece.unspecified","uvvx":"application/vnd.dece.unspecified","uvz":"application/vnd.dece.zip","uvvz":"application/vnd.dece.zip","fe_launch":"application/vnd.denovo.fcselayout-link","dna":"application/vnd.dna","mlp":"application/vnd.dolby.mlp","dpg":"application/vnd.dpgraph","dfac":"application/vnd.dreamfactory","kpxx":"application/vnd.ds-keypoint","ait":"application/vnd.dvb.ait","svc":"application/vnd.dvb.service","geo":"application/vnd.dynageo","mag":"application/vnd.ecowin.chart","nml":"application/vnd.enliven","esf":"application/vnd.epson.esf","msf":"application/vnd.epson.msf","qam":"application/vnd.epson.quickanime","slt":"application/vnd.epson.salt","ssf":"application/vnd.epson.ssf","es3":"application/vnd.eszigno3+xml","et3":"application/vnd.eszigno3+xml","ez2":"application/vnd.ezpix-album","ez3":"application/vnd.ezpix-package","fdf":"application/vnd.fdf","mseed":"application/vnd.fdsn.mseed","seed":"application/vnd.fdsn.seed","dataless":"application/vnd.fdsn.seed","gph":"application/vnd.flographit","ftc":"application/vnd.fluxtime.clip","fm":"application/vnd.framemaker","frame":"application/vnd.framemaker","maker":"application/vnd.framemaker","book":"application/vnd.framemaker","fnc":"application/vnd.frogans.fnc","ltf":"application/vnd.frogans.ltf","fsc":"application/vnd.fsc.weblaunch","oas":"application/vnd.fujitsu.oasys","oa2":"application/vnd.fujitsu.oasys2","oa3":"application/vnd.fujitsu.oasys3","fg5":"application/vnd.fujitsu.oasysgp","bh2":"application/vnd.fujitsu.oasysprs","ddd":"application/vnd.fujixerox.ddd","xdw":"application/vnd.fujixerox.docuworks","xbd":"application/vnd.fujixerox.docuworks.binder","fzs":"application/vnd.fuzzysheet","txd":"application/vnd.genomatix.tuxedo","ggb":"application/vnd.geogebra.file","ggt":"application/vnd.geogebra.tool","gex":"application/vnd.geometry-explorer","gre":"application/vnd.geometry-explorer","gxt":"application/vnd.geonext","g2w":"application/vnd.geoplan","g3w":"application/vnd.geospace","gmx":"application/vnd.gmx","gdoc":"application/vnd.google-apps.document","gslides":"application/vnd.google-apps.presentation","gsheet":"application/vnd.google-apps.spreadsheet","kml":"application/vnd.google-earth.kml+xml","kmz":"application/vnd.google-earth.kmz","gqf":"application/vnd.grafeq","gqs":"application/vnd.grafeq","gac":"application/vnd.groove-account","ghf":"application/vnd.groove-help","gim":"application/vnd.groove-identity-message","grv":"application/vnd.groove-injector","gtm":"application/vnd.groove-tool-message","tpl":"application/vnd.groove-tool-template","vcg":"application/vnd.groove-vcard","hal":"application/vnd.hal+xml","zmm":"application/vnd.handheld-entertainment+xml","hbci":"application/vnd.hbci","les":"application/vnd.hhe.lesson-player","hpgl":"application/vnd.hp-hpgl","hpid":"application/vnd.hp-hpid","hps":"application/vnd.hp-hps","jlt":"application/vnd.hp-jlyt","pcl":"application/vnd.hp-pcl","pclxl":"application/vnd.hp-pclxl","sfd-hdstx":"application/vnd.hydrostatix.sof-data","mpy":"application/vnd.ibm.minipay","afp":"application/vnd.ibm.modcap","listafp":"application/vnd.ibm.modcap","list3820":"application/vnd.ibm.modcap","irm":"application/vnd.ibm.rights-management","sc":"application/vnd.ibm.secure-container","icc":"application/vnd.iccprofile","icm":"application/vnd.iccprofile","igl":"application/vnd.igloader","ivp":"application/vnd.immervision-ivp","ivu":"application/vnd.immervision-ivu","igm":"application/vnd.insors.igm","xpw":"application/vnd.intercon.formnet","xpx":"application/vnd.intercon.formnet","i2g":"application/vnd.intergeo","qbo":"application/vnd.intu.qbo","qfx":"application/vnd.intu.qfx","rcprofile":"application/vnd.ipunplugged.rcprofile","irp":"application/vnd.irepository.package+xml","xpr":"application/vnd.is-xpr","fcs":"application/vnd.isac.fcs","jam":"application/vnd.jam","rms":"application/vnd.jcp.javame.midlet-rms","jisp":"application/vnd.jisp","joda":"application/vnd.joost.joda-archive","ktz":"application/vnd.kahootz","ktr":"application/vnd.kahootz","karbon":"application/vnd.kde.karbon","chrt":"application/vnd.kde.kchart","kfo":"application/vnd.kde.kformula","flw":"application/vnd.kde.kivio","kon":"application/vnd.kde.kontour","kpr":"application/vnd.kde.kpresenter","kpt":"application/vnd.kde.kpresenter","ksp":"application/vnd.kde.kspread","kwd":"application/vnd.kde.kword","kwt":"application/vnd.kde.kword","htke":"application/vnd.kenameaapp","kia":"application/vnd.kidspiration","kne":"application/vnd.kinar","knp":"application/vnd.kinar","skp":"application/vnd.koan","skd":"application/vnd.koan","skt":"application/vnd.koan","skm":"application/vnd.koan","sse":"application/vnd.kodak-descriptor","lasxml":"application/vnd.las.las+xml","lbd":"application/vnd.llamagraphics.life-balance.desktop","lbe":"application/vnd.llamagraphics.life-balance.exchange+xml","123":"application/vnd.lotus-1-2-3","apr":"application/vnd.lotus-approach","pre":"application/vnd.lotus-freelance","nsf":"application/vnd.lotus-notes","org":"application/vnd.lotus-organizer","scm":"application/vnd.lotus-screencam","lwp":"application/vnd.lotus-wordpro","portpkg":"application/vnd.macports.portpkg","mcd":"application/vnd.mcd","mc1":"application/vnd.medcalcdata","cdkey":"application/vnd.mediastation.cdkey","mwf":"application/vnd.mfer","mfm":"application/vnd.mfmp","flo":"application/vnd.micrografx.flo","igx":"application/vnd.micrografx.igx","mif":"application/vnd.mif","daf":"application/vnd.mobius.daf","dis":"application/vnd.mobius.dis","mbk":"application/vnd.mobius.mbk","mqy":"application/vnd.mobius.mqy","msl":"application/vnd.mobius.msl","plc":"application/vnd.mobius.plc","txf":"application/vnd.mobius.txf","mpn":"application/vnd.mophun.application","mpc":"application/vnd.mophun.certificate","xul":"application/vnd.mozilla.xul+xml","cil":"application/vnd.ms-artgalry","cab":"application/vnd.ms-cab-compressed","xls":"application/vnd.ms-excel","xlm":"application/vnd.ms-excel","xla":"application/vnd.ms-excel","xlc":"application/vnd.ms-excel","xlt":"application/vnd.ms-excel","xlw":"application/vnd.ms-excel","xlam":"application/vnd.ms-excel.addin.macroenabled.12","xlsb":"application/vnd.ms-excel.sheet.binary.macroenabled.12","xlsm":"application/vnd.ms-excel.sheet.macroenabled.12","xltm":"application/vnd.ms-excel.template.macroenabled.12","eot":"application/vnd.ms-fontobject","chm":"application/vnd.ms-htmlhelp","ims":"application/vnd.ms-ims","lrm":"application/vnd.ms-lrm","thmx":"application/vnd.ms-officetheme","msg":"application/vnd.ms-outlook","cat":"application/vnd.ms-pki.seccat","stl":"application/vnd.ms-pki.stl","ppt":"application/vnd.ms-powerpoint","pps":"application/vnd.ms-powerpoint","pot":"application/vnd.ms-powerpoint","ppam":"application/vnd.ms-powerpoint.addin.macroenabled.12","pptm":"application/vnd.ms-powerpoint.presentation.macroenabled.12","sldm":"application/vnd.ms-powerpoint.slide.macroenabled.12","ppsm":"application/vnd.ms-powerpoint.slideshow.macroenabled.12","potm":"application/vnd.ms-powerpoint.template.macroenabled.12","mpp":"application/vnd.ms-project","mpt":"application/vnd.ms-project","docm":"application/vnd.ms-word.document.macroenabled.12","dotm":"application/vnd.ms-word.template.macroenabled.12","wps":"application/vnd.ms-works","wks":"application/vnd.ms-works","wcm":"application/vnd.ms-works","wdb":"application/vnd.ms-works","wpl":"application/vnd.ms-wpl","xps":"application/vnd.ms-xpsdocument","mseq":"application/vnd.mseq","mus":"application/vnd.musician","msty":"application/vnd.muvee.style","taglet":"application/vnd.mynfc","nlu":"application/vnd.neurolanguage.nlu","ntf":"application/vnd.nitf","nitf":"application/vnd.nitf","nnd":"application/vnd.noblenet-directory","nns":"application/vnd.noblenet-sealer","nnw":"application/vnd.noblenet-web","ngdat":"application/vnd.nokia.n-gage.data","n-gage":"application/vnd.nokia.n-gage.symbian.install","rpst":"application/vnd.nokia.radio-preset","rpss":"application/vnd.nokia.radio-presets","edm":"application/vnd.novadigm.edm","edx":"application/vnd.novadigm.edx","ext":"application/vnd.novadigm.ext","odc":"application/vnd.oasis.opendocument.chart","otc":"application/vnd.oasis.opendocument.chart-template","odb":"application/vnd.oasis.opendocument.database","odf":"application/vnd.oasis.opendocument.formula","odft":"application/vnd.oasis.opendocument.formula-template","odg":"application/vnd.oasis.opendocument.graphics","otg":"application/vnd.oasis.opendocument.graphics-template","odi":"application/vnd.oasis.opendocument.image","oti":"application/vnd.oasis.opendocument.image-template","odp":"application/vnd.oasis.opendocument.presentation","otp":"application/vnd.oasis.opendocument.presentation-template","ods":"application/vnd.oasis.opendocument.spreadsheet","ots":"application/vnd.oasis.opendocument.spreadsheet-template","odt":"application/vnd.oasis.opendocument.text","odm":"application/vnd.oasis.opendocument.text-master","ott":"application/vnd.oasis.opendocument.text-template","oth":"application/vnd.oasis.opendocument.text-web","xo":"application/vnd.olpc-sugar","dd2":"application/vnd.oma.dd2+xml","oxt":"application/vnd.openofficeorg.extension","pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation","sldx":"application/vnd.openxmlformats-officedocument.presentationml.slide","ppsx":"application/vnd.openxmlformats-officedocument.presentationml.slideshow","potx":"application/vnd.openxmlformats-officedocument.presentationml.template","xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","xltx":"application/vnd.openxmlformats-officedocument.spreadsheetml.template","docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","dotx":"application/vnd.openxmlformats-officedocument.wordprocessingml.template","mgp":"application/vnd.osgeo.mapguide.package","dp":"application/vnd.osgi.dp","esa":"application/vnd.osgi.subsystem","pdb":"application/vnd.palm","pqa":"application/vnd.palm","oprc":"application/vnd.palm","paw":"application/vnd.pawaafile","str":"application/vnd.pg.format","ei6":"application/vnd.pg.osasli","efif":"application/vnd.picsel","wg":"application/vnd.pmi.widget","plf":"application/vnd.pocketlearn","pbd":"application/vnd.powerbuilder6","box":"application/vnd.previewsystems.box","mgz":"application/vnd.proteus.magazine","qps":"application/vnd.publishare-delta-tree","ptid":"application/vnd.pvi.ptid1","qxd":"application/vnd.quark.quarkxpress","qxt":"application/vnd.quark.quarkxpress","qwd":"application/vnd.quark.quarkxpress","qwt":"application/vnd.quark.quarkxpress","qxl":"application/vnd.quark.quarkxpress","qxb":"application/vnd.quark.quarkxpress","bed":"application/vnd.realvnc.bed","mxl":"application/vnd.recordare.musicxml","musicxml":"application/vnd.recordare.musicxml+xml","cryptonote":"application/vnd.rig.cryptonote","cod":"application/vnd.rim.cod","rm":"application/vnd.rn-realmedia","rmvb":"application/vnd.rn-realmedia-vbr","link66":"application/vnd.route66.link66+xml","st":"application/vnd.sailingtracker.track","see":"application/vnd.seemail","sema":"application/vnd.sema","semd":"application/vnd.semd","semf":"application/vnd.semf","ifm":"application/vnd.shana.informed.formdata","itp":"application/vnd.shana.informed.formtemplate","iif":"application/vnd.shana.informed.interchange","ipk":"application/vnd.shana.informed.package","twd":"application/vnd.simtech-mindmapper","twds":"application/vnd.simtech-mindmapper","mmf":"application/vnd.smaf","teacher":"application/vnd.smart.teacher","sdkm":"application/vnd.solent.sdkm+xml","sdkd":"application/vnd.solent.sdkm+xml","dxp":"application/vnd.spotfire.dxp","sfs":"application/vnd.spotfire.sfs","sdc":"application/vnd.stardivision.calc","sda":"application/vnd.stardivision.draw","sdd":"application/vnd.stardivision.impress","smf":"application/vnd.stardivision.math","sdw":"application/vnd.stardivision.writer","vor":"application/vnd.stardivision.writer","sgl":"application/vnd.stardivision.writer-global","smzip":"application/vnd.stepmania.package","sm":"application/vnd.stepmania.stepchart","wadl":"application/vnd.sun.wadl+xml","sxc":"application/vnd.sun.xml.calc","stc":"application/vnd.sun.xml.calc.template","sxd":"application/vnd.sun.xml.draw","std":"application/vnd.sun.xml.draw.template","sxi":"application/vnd.sun.xml.impress","sti":"application/vnd.sun.xml.impress.template","sxm":"application/vnd.sun.xml.math","sxw":"application/vnd.sun.xml.writer","sxg":"application/vnd.sun.xml.writer.global","stw":"application/vnd.sun.xml.writer.template","sus":"application/vnd.sus-calendar","susp":"application/vnd.sus-calendar","svd":"application/vnd.svd","sis":"application/vnd.symbian.install","sisx":"application/vnd.symbian.install","xsm":"application/vnd.syncml+xml","bdm":"application/vnd.syncml.dm+wbxml","xdm":"application/vnd.syncml.dm+xml","tao":"application/vnd.tao.intent-module-archive","pcap":"application/vnd.tcpdump.pcap","cap":"application/vnd.tcpdump.pcap","dmp":"application/vnd.tcpdump.pcap","tmo":"application/vnd.tmobile-livetv","tpt":"application/vnd.trid.tpt","mxs":"application/vnd.triscape.mxs","tra":"application/vnd.trueapp","ufd":"application/vnd.ufdl","ufdl":"application/vnd.ufdl","utz":"application/vnd.uiq.theme","umj":"application/vnd.umajin","unityweb":"application/vnd.unity","uoml":"application/vnd.uoml+xml","vcx":"application/vnd.vcx","vsd":"application/vnd.visio","vst":"application/vnd.visio","vss":"application/vnd.visio","vsw":"application/vnd.visio","vis":"application/vnd.visionary","vsf":"application/vnd.vsf","wbxml":"application/vnd.wap.wbxml","wmlc":"application/vnd.wap.wmlc","wmlsc":"application/vnd.wap.wmlscriptc","wtb":"application/vnd.webturbo","nbp":"application/vnd.wolfram.player","wpd":"application/vnd.wordperfect","wqd":"application/vnd.wqd","stf":"application/vnd.wt.stf","xar":"application/vnd.xara","xfdl":"application/vnd.xfdl","hvd":"application/vnd.yamaha.hv-dic","hvs":"application/vnd.yamaha.hv-script","hvp":"application/vnd.yamaha.hv-voice","osf":"application/vnd.yamaha.openscoreformat","osfpvg":"application/vnd.yamaha.openscoreformat.osfpvg+xml","saf":"application/vnd.yamaha.smaf-audio","spf":"application/vnd.yamaha.smaf-phrase","cmp":"application/vnd.yellowriver-custom-menu","zir":"application/vnd.zul","zirz":"application/vnd.zul","zaz":"application/vnd.zzazz.deck+xml","7z":"application/x-7z-compressed","abw":"application/x-abiword","ace":"application/x-ace-compressed","dmg":"application/x-apple-diskimage","arj":"application/x-arj","aab":"application/x-authorware-bin","x32":"application/x-authorware-bin","u32":"application/x-authorware-bin","vox":"application/x-authorware-bin","aam":"application/x-authorware-map","aas":"application/x-authorware-seg","bcpio":"application/x-bcpio","bdoc":"application/x-bdoc","torrent":"application/x-bittorrent","blb":"application/x-blorb","blorb":"application/x-blorb","bz":"application/x-bzip","bz2":"application/x-bzip2","boz":"application/x-bzip2","cbr":"application/x-cbr","cba":"application/x-cbr","cbt":"application/x-cbr","cbz":"application/x-cbr","cb7":"application/x-cbr","vcd":"application/x-cdlink","cfs":"application/x-cfs-compressed","chat":"application/x-chat","pgn":"application/x-chess-pgn","crx":"application/x-chrome-extension","cco":"application/x-cocoa","nsc":"application/x-conference","cpio":"application/x-cpio","csh":"application/x-csh","deb":"application/x-debian-package","udeb":"application/x-debian-package","dgc":"application/x-dgc-compressed","dir":"application/x-director","dcr":"application/x-director","dxr":"application/x-director","cst":"application/x-director","cct":"application/x-director","cxt":"application/x-director","w3d":"application/x-director","fgd":"application/x-director","swa":"application/x-director","wad":"application/x-doom","ncx":"application/x-dtbncx+xml","dtb":"application/x-dtbook+xml","res":"application/x-dtbresource+xml","dvi":"application/x-dvi","evy":"application/x-envoy","eva":"application/x-eva","bdf":"application/x-font-bdf","gsf":"application/x-font-ghostscript","psf":"application/x-font-linux-psf","pcf":"application/x-font-pcf","snf":"application/x-font-snf","pfa":"application/x-font-type1","pfb":"application/x-font-type1","pfm":"application/x-font-type1","afm":"application/x-font-type1","arc":"application/x-freearc","spl":"application/x-futuresplash","gca":"application/x-gca-compressed","ulx":"application/x-glulx","gnumeric":"application/x-gnumeric","gramps":"application/x-gramps-xml","gtar":"application/x-gtar","hdf":"application/x-hdf","php":"application/x-httpd-php","install":"application/x-install-instructions","iso":"application/x-iso9660-image","jardiff":"application/x-java-archive-diff","jnlp":"application/x-java-jnlp-file","latex":"application/x-latex","luac":"application/x-lua-bytecode","lzh":"application/x-lzh-compressed","lha":"application/x-lzh-compressed","run":"application/x-makeself","mie":"application/x-mie","prc":"application/x-mobipocket-ebook","mobi":"application/x-mobipocket-ebook","application":"application/x-ms-application","lnk":"application/x-ms-shortcut","wmd":"application/x-ms-wmd","wmz":"application/x-ms-wmz","xbap":"application/x-ms-xbap","mdb":"application/x-msaccess","obd":"application/x-msbinder","crd":"application/x-mscardfile","clp":"application/x-msclip","exe":"application/x-msdos-program","exe":"application/x-msdownload","dll":"application/x-msdownload","com":"application/x-msdownload","bat":"application/x-msdownload","msi":"application/x-msdownload","mvb":"application/x-msmediaview","m13":"application/x-msmediaview","m14":"application/x-msmediaview","wmf":"application/x-msmetafile","wmz":"application/x-msmetafile","emf":"application/x-msmetafile","emz":"application/x-msmetafile","mny":"application/x-msmoney","pub":"application/x-mspublisher","scd":"application/x-msschedule","trm":"application/x-msterminal","wri":"application/x-mswrite","nc":"application/x-netcdf","cdf":"application/x-netcdf","pac":"application/x-ns-proxy-autoconfig","nzb":"application/x-nzb","pl":"application/x-perl","pm":"application/x-perl","prc":"application/x-pilot","pdb":"application/x-pilot","p12":"application/x-pkcs12","pfx":"application/x-pkcs12","p7b":"application/x-pkcs7-certificates","spc":"application/x-pkcs7-certificates","p7r":"application/x-pkcs7-certreqresp","rar":"application/x-rar-compressed","rpm":"application/x-redhat-package-manager","ris":"application/x-research-info-systems","sea":"application/x-sea","sh":"application/x-sh","shar":"application/x-shar","swf":"application/x-shockwave-flash","xap":"application/x-silverlight-app","sql":"application/x-sql","sit":"application/x-stuffit","sitx":"application/x-stuffitx","srt":"application/x-subrip","sv4cpio":"application/x-sv4cpio","sv4crc":"application/x-sv4crc","t3":"application/x-t3vm-image","gam":"application/x-tads","tar":"application/x-tar","tcl":"application/x-tcl","tk":"application/x-tcl","tex":"application/x-tex","tfm":"application/x-tex-tfm","texinfo":"application/x-texinfo","texi":"application/x-texinfo","obj":"application/x-tgif","ustar":"application/x-ustar","hdd":"application/x-virtualbox-hdd","ova":"application/x-virtualbox-ova","ovf":"application/x-virtualbox-ovf","vbox":"application/x-virtualbox-vbox","vbox-extpack":"application/x-virtualbox-vbox-extpack","vdi":"application/x-virtualbox-vdi","vhd":"application/x-virtualbox-vhd","vmdk":"application/x-virtualbox-vmdk","src":"application/x-wais-source","webapp":"application/x-web-app-manifest+json","der":"application/x-x509-ca-cert","crt":"application/x-x509-ca-cert","pem":"application/x-x509-ca-cert","fig":"application/x-xfig","xlf":"application/x-xliff+xml","xpi":"application/x-xpinstall","xz":"application/x-xz","z1":"application/x-zmachine","z2":"application/x-zmachine","z3":"application/x-zmachine","z4":"application/x-zmachine","z5":"application/x-zmachine","z6":"application/x-zmachine","z7":"application/x-zmachine","z8":"application/x-zmachine","uva":"audio/vnd.dece.audio","uvva":"audio/vnd.dece.audio","eol":"audio/vnd.digital-winds","dra":"audio/vnd.dra","dts":"audio/vnd.dts","dtshd":"audio/vnd.dts.hd","lvp":"audio/vnd.lucent.voice","pya":"audio/vnd.ms-playready.media.pya","ecelp4800":"audio/vnd.nuera.ecelp4800","ecelp7470":"audio/vnd.nuera.ecelp7470","ecelp9600":"audio/vnd.nuera.ecelp9600","rip":"audio/vnd.rip","aac":"audio/x-aac","aif":"audio/x-aiff","aiff":"audio/x-aiff","aifc":"audio/x-aiff","caf":"audio/x-caf","flac":"audio/x-flac","m4a":"audio/x-m4a","mka":"audio/x-matroska","m3u":"audio/x-mpegurl","wax":"audio/x-ms-wax","wma":"audio/x-ms-wma","ram":"audio/x-pn-realaudio","ra":"audio/x-pn-realaudio","rmp":"audio/x-pn-realaudio-plugin","ra":"audio/x-realaudio","wav":"audio/x-wav","cdx":"chemical/x-cdx","cif":"chemical/x-cif","cmdf":"chemical/x-cmdf","cml":"chemical/x-cml","csml":"chemical/x-csml","xyz":"chemical/x-xyz","btif":"image/prs.btif","psd":"image/vnd.adobe.photoshop","uvi":"image/vnd.dece.graphic","uvvi":"image/vnd.dece.graphic","uvg":"image/vnd.dece.graphic","uvvg":"image/vnd.dece.graphic","djvu":"image/vnd.djvu","djv":"image/vnd.djvu","sub":"image/vnd.dvb.subtitle","dwg":"image/vnd.dwg","dxf":"image/vnd.dxf","fbs":"image/vnd.fastbidsheet","fpx":"image/vnd.fpx","fst":"image/vnd.fst","mmr":"image/vnd.fujixerox.edmics-mmr","rlc":"image/vnd.fujixerox.edmics-rlc","mdi":"image/vnd.ms-modi","wdp":"image/vnd.ms-photo","npx":"image/vnd.net-fpx","wbmp":"image/vnd.wap.wbmp","xif":"image/vnd.xiff","3ds":"image/x-3ds","ras":"image/x-cmu-raster","cmx":"image/x-cmx","fh":"image/x-freehand","fhc":"image/x-freehand","fh4":"image/x-freehand","fh5":"image/x-freehand","fh7":"image/x-freehand","ico":"image/x-icon","jng":"image/x-jng","sid":"image/x-mrsid-image","bmp":"image/x-ms-bmp","pcx":"image/x-pcx","pic":"image/x-pict","pct":"image/x-pict","pnm":"image/x-portable-anymap","pbm":"image/x-portable-bitmap","pgm":"image/x-portable-graymap","ppm":"image/x-portable-pixmap","rgb":"image/x-rgb","tga":"image/x-tga","xbm":"image/x-xbitmap","xpm":"image/x-xpixmap","xwd":"image/x-xwindowdump","dae":"model/vnd.collada+xml","dwf":"model/vnd.dwf","gdl":"model/vnd.gdl","gtw":"model/vnd.gtw","mts":"model/vnd.mts","vtu":"model/vnd.vtu","dsc":"text/prs.lines.tag","curl":"text/vnd.curl","dcurl":"text/vnd.curl.dcurl","mcurl":"text/vnd.curl.mcurl","scurl":"text/vnd.curl.scurl","sub":"text/vnd.dvb.subtitle","fly":"text/vnd.fly","flx":"text/vnd.fmi.flexstor","gv":"text/vnd.graphviz","3dml":"text/vnd.in3d.3dml","spot":"text/vnd.in3d.spot","jad":"text/vnd.sun.j2me.app-descriptor","wml":"text/vnd.wap.wml","wmls":"text/vnd.wap.wmlscript","s":"text/x-asm","asm":"text/x-asm","c":"text/x-c","cc":"text/x-c","cxx":"text/x-c","cpp":"text/x-c","h":"text/x-c","hh":"text/x-c","dic":"text/x-c","htc":"text/x-component","f":"text/x-fortran","for":"text/x-fortran","f77":"text/x-fortran","f90":"text/x-fortran","hbs":"text/x-handlebars-template","java":"text/x-java-source","lua":"text/x-lua","mkd":"text/x-markdown","nfo":"text/x-nfo","opml":"text/x-opml","org":"text/x-org","p":"text/x-pascal","pas":"text/x-pascal","pde":"text/x-processing","sass":"text/x-sass","scss":"text/x-scss","etx":"text/x-setext","sfv":"text/x-sfv","ymp":"text/x-suse-ymp","uu":"text/x-uuencode","vcs":"text/x-vcalendar","vcf":"text/x-vcard","uvh":"video/vnd.dece.hd","uvvh":"video/vnd.dece.hd","uvm":"video/vnd.dece.mobile","uvvm":"video/vnd.dece.mobile","uvp":"video/vnd.dece.pd","uvvp":"video/vnd.dece.pd","uvs":"video/vnd.dece.sd","uvvs":"video/vnd.dece.sd","uvv":"video/vnd.dece.video","uvvv":"video/vnd.dece.video","dvb":"video/vnd.dvb.file","fvt":"video/vnd.fvt","mxu":"video/vnd.mpegurl","m4u":"video/vnd.mpegurl","pyv":"video/vnd.ms-playready.media.pyv","uvu":"video/vnd.uvvu.mp4","uvvu":"video/vnd.uvvu.mp4","viv":"video/vnd.vivo","f4v":"video/x-f4v","fli":"video/x-fli","flv":"video/x-flv","m4v":"video/x-m4v","mkv":"video/x-matroska","mk3d":"video/x-matroska","mks":"video/x-matroska","mng":"video/x-mng","asf":"video/x-ms-asf","asx":"video/x-ms-asf","vob":"video/x-ms-vob","wm":"video/x-ms-wm","wmv":"video/x-ms-wmv","wmx":"video/x-ms-wmx","wvx":"video/x-ms-wvx","avi":"video/x-msvideo","movie":"video/x-sgi-movie","smv":"video/x-smv","ice":"x-conference/x-cooltalk"};
    
    FileUploadEditor.prototype.createElements = function () {
        Handsontable.editors.TextEditor.prototype.createElements.apply(this,
                arguments);
        this.UPLOADINPUT = document.createElement('input');
        this.UPLOADINPUT.setAttribute('type', 'file');
        this.UPLOADINPUT.setAttribute('id', uploadId);
        this.UPLOADINPUT.className = 'handsontableInput';
        this.textareaStyle = this.TEXTAREA.style;
        this.textareaStyle.width = 0;
        this.textareaStyle.height = 0;
        this.textareaStyle.display = 'none';
        this.TEXTAREA_PARENT.appendChild(this.UPLOADINPUT);
    };
    FileUploadEditor.prototype.prepare = function () {
        Handsontable.editors.TextEditor.prototype.prepare
                .apply(this, arguments);
        $("#" + uploadId).css("width", "0");
        $("#" + uploadId).css("height", "0");
        $("#" + uploadId).css("display", "none");
        $("#" + uploadId).replaceWith($("#" + uploadId).val('').clone(true));
    };
    FileUploadEditor.prototype.focus = function() {
        //ignore, else FF will not work
    };
    FileUploadEditor.prototype.beginEditing = function () {
        Handsontable.editors.TextEditor.prototype.beginEditing.apply(this, arguments);
        
        var meta = this.cellProperties;
        var o = meta.jsonProp;
        var acceptedFiles = o.fileType.replace(/;/g, ',');
                    
        var fileTypes = o.fileType.split(";");
        for (var i in fileTypes) {
            var ext = fileTypes[i];
            var mime = typemap[ext.substring(1)];

            if (mime !== undefined) {
                acceptedFiles += "," + mime;
            }
        }
        
        if (acceptedFiles !== undefined && acceptedFiles !== null && acceptedFiles.length > 0) {
            $('#' + uploadId).attr('accept', acceptedFiles);
        } else {
            if (this.cellProperties.jFormatType === "image") {
                $('#' + uploadId).attr('accept', "image/*");
            } else {
                $('#' + uploadId).removeAttr('accept');
            }
        }
        
        var uploadArea = this;
        $('#' + uploadId).off("change");
        $('#' + uploadId).on("change", function () {
            var file = $(this).prop('files')[0];
            if (file) {
                //upload file
                var data = new FormData();
                data.append("fileUpload", file);
                
                meta['error'] = "";
                
                if (o.maxSize !== undefined && o.maxSize !== "") {
                    var size = 0;
                    try {
                        size = parseInt(o.maxSize);
                        if (size > 0 && file.size > (size * 1024)) {
                            meta['error'] = o.maxSizeMsg;
                            uploadArea.instance.getActiveEditor().finishEditing();
                            return;
                        }
                    } catch (err) {}
                }
                
                $('#' + uploadId).parent().prepend('<img style="padding:2px 5px;" src="'+meta.contextPath+'/images/v3/loading.gif" />');
                var url = meta.serviceUrl + "&_a=upload&_field=" + encodeURIComponent(meta.data) + "&_formDefId=" + encodeURIComponent(meta.formDefId) + "&_type=" + encodeURIComponent(meta.jFormatType);
                if (meta.jFormatType === "image") {
                    var width = 60;
                    try {
                        width = parseInt(o.width);
                    } catch (err) {}
                    var height = 60;
                    try {
                        height = parseInt(o.height);
                    } catch (err) {}
                    url += "&_width=" + encodeURIComponent(width) + "&_height=" + encodeURIComponent(height);
                }
                
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    processData: false, // Don't process the files
                    contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                    success: function(data, textStatus, jqXHR)
                    {
                        if(typeof data.error === 'undefined')
                        {
                            var value = data.newFilename;
                            var filePaths = [data.path];
                            if (o.multiple === "true") {
                                var exist = uploadArea.instance.getDataAtRowProp(uploadArea.row, meta.data);
                                if (exist !== undefined && exist !== null && exist !== "") {
                                    var values = exist.split(";");
                                    if (values.indexOf(value) === -1) {
                                        value = exist + ";" + value;
                                    }
                                }
                                var existPath = uploadArea.instance.getDataAtRowProp(uploadArea.row, "_tempFilePathMap."+meta.data);
                                if (existPath !== undefined && existPath !== null && existPath.length > 0) {
                                    var newExistPath = [];
                                    for (var i=0; i < existPath.length; i++) {
                                        if (existPath[i].indexOf(value) === -1) {
                                            newExistPath.push(existPath[i]);
                                        }
                                    }
                                    filePaths = newExistPath.concat(filePaths);
                                }
                            } else if (o.removeFile === "true") {
                                var exist = uploadArea.instance.getDataAtRowProp(uploadArea.row, meta.data);
                                var existPath = uploadArea.instance.getDataAtRowProp(uploadArea.row, "_tempFilePathMap."+meta.data);
                                var inExistPath = false;
                                if (existPath !== undefined && existPath !== null && existPath.length > 0) {
                                    for (var i=0; i < existPath.length; i++) {
                                        if (existPath[i].indexOf(exist) !== -1) {
                                            inExistPath = true;
                                            break;
                                        }
                                    }
                                }
                                var deletePath = uploadArea.instance.getDataAtRowProp(uploadArea.row, "_deleteFilePathMap."+meta.data);
                                if (deletePath === undefined || deletePath === null) {
                                    deletePath = [];
                                }
                                if (!inExistPath) {
                                    deletePath.push(exist);
                                    if (meta.jFormatType === "image") {
                                        deletePath.push(exist + ".thumb.jpg");
                                    }
                                }
                                uploadArea.instance.setDataAtRowProp(uploadArea.row, "_deleteFilePathMap."+meta.data, deletePath, "upload_field");
                            }
                            uploadArea.instance.setDataAtRowProp(uploadArea.row, meta.data, value, "edit");
                            uploadArea.instance.setDataAtRowProp(uploadArea.row, "_tempFilePathMap."+meta.data, filePaths, "upload_field");
                            if (meta.jFormatType === "image") {
                                var thumbs = [data.path+".thumb.jpg"];
                                if (o.multiple === "true") {
                                    var existThumbPath = uploadArea.instance.getDataAtRowProp(uploadArea.row, "_tempFilePathMap."+meta.data+"_thumbnail");
                                    if (existThumbPath !== undefined && existThumbPath !== null && existThumbPath.length > 0) {
                                        var newExistThumbPath = [];
                                        for (var i=0; i < existThumbPath.length; i++) {
                                            if (existThumbPath[i].indexOf(value) === -1) {
                                                newExistThumbPath.push(existThumbPath[i]);
                                            }
                                        }
                                        thumbs = newExistThumbPath.concat(thumbs);
                                    }
                                }
                                uploadArea.instance.setDataAtRowProp(uploadArea.row, "_tempFilePathMap."+meta.data+"_thumbnail", thumbs, "upload_field");
                            }
                        } else {
                            meta['error'] = data.error;
                        }
                        $('#' + uploadId).parent().find("img").remove();
                        uploadArea.instance.getActiveEditor().finishEditing();
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        $('#' + uploadId).parent().find("img").remove();
                        uploadArea.instance.getActiveEditor().finishEditing();
                    }
                });
            }
        });
        
        $('#' + uploadId).click();
    };
    Handsontable.editors.FileUploadEditor = FileUploadEditor;
    Handsontable.editors.registerEditor('file', FileUploadEditor);
})(Handsontable);
(function( $ ){

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }

    var methods = {
        init: function(args, i18n) {
            return this.each(function(){
                JSpreadShetFormDataLoader.url = args.serviceURL;
                        
                var thisObj = $(this);
                var hot;
                
                var colHeaders = [];
                var columns = [];
                var colWidths = [];
                var customColWidth = false;
                var formulaRefs = {};
                var formulaColumns = {};
                var oriFormulaColumns = {};
                var ajaxOptionsColumns = {};
                var checkboxes = [];
                var dataSchema = {id: ""};
                
                var convertToBe = function(date) {
                    var year = date.getFullYear();
                    if ((parseInt(year) - 543) < 1900) {
                        year = parseInt(year) + 543;
                        date.setFullYear(year);
                    }
                    return date;
                };
                
                var optionsRenderer = function (instance, td, row, col, prop, value, cellProperties) {
                    var optionsList = cellProperties.keyOptions;

                    var foundValue = "";
                    value = value + "";
                    for (var index = 0; index < optionsList.length; index++) {
                        if (value === optionsList[index].value + "") {
                            foundValue = optionsList[index].label.trim();
                        }
                    }
                    value = foundValue;
                    Handsontable.renderers.AutocompleteRenderer.apply(this, arguments);
                };
                
                var dateRenderer = function (instance, td, row, col, prop, value, cellProperties) {
                    if (cellProperties.dateDisplayFormat !== undefined && value !== undefined && value !== "") {
                        var d = new Date(getDateFromFormat(value, methods.getDateFormat(cellProperties.dateFormat)));
                        if (cellProperties.isBE) {
                            d = convertToBe(d);
                        }
                        value = formatDate(d , methods.getDateFormat(cellProperties.dateDisplayFormat));
                    } else if (cellProperties.isBE && value !== undefined && value !== "") {
                        var d = new Date(getDateFromFormat(value, methods.getDateFormat(cellProperties.dateFormat)));
                        d = convertToBe(d);
                        value = formatDate(d , methods.getDateFormat(cellProperties.dateFormat));
                    }
                    Handsontable.renderers.AutocompleteRenderer.apply(this, arguments);
                };
                
                var fileRenderer = function (instance, td, row, col, prop, values, cellProperties) {
                    if (values) {
                        var type = cellProperties.jFormatType;
                        var formDefId = cellProperties.formDefId;
                        var readonly = cellProperties.readOnly;
                        var tempPath = instance.getDataAtRowProp(row, "_tempFilePathMap."+prop);
                        var id = instance.getDataAtRowProp(row, "id");
                        
                        $(td).html('');
                        $(td).append("<div class=\"file_container\"></div>");
                        
                        var valuesList = values.split(";");
                        $.each(valuesList, function(i, value){
                            var fileContainer = $('<div class="filename_container"></div>');
                            var isTemp = false;
                            if (tempPath !== null && tempPath !== undefined && tempPath.length > 0) {
                                for (var i=0; i < tempPath.length; i++) {
                                    if (tempPath[i].indexOf(value) !== -1) {
                                        isTemp = true;
                                    }
                                }
                            }
                            
                            if (type === "image") {
                                var o = cellProperties.jsonProp;
                                var width = 60;
                                try {
                                    width = parseInt(o.width);
                                } catch (err) {}
                                var height = 60;
                                try {
                                    height = parseInt(o.height);
                                } catch (err) {}
                                var thumbLink = "";
                                if (isTemp) {
                                    var thumbTempPath = instance.getDataAtRowProp(row, "_tempFilePathMap."+prop+"_thumbnail");
                                    if (thumbTempPath !== undefined && thumbTempPath !== null && thumbTempPath.length > 0) {
                                        for (var i=0; i < thumbTempPath.length; i++) {
                                            if (thumbTempPath[i].indexOf(value) !== -1) {
                                                thumbLink = cellProperties.serviceUrl + "&_a=upload&_path=" + encodeURIComponent(thumbTempPath[i]);
                                            }
                                        }
                                    }
                                } else {
                                    var encodedFileName = encodeURIComponent(value);
                                    if (id !== undefined && id !== null && id !== "") {
                                        thumbLink = args.contextPath + "/web/client/app/" + args.appId + "/" + args.appVersion + "/form/download/" + formDefId + "/" + id + "/" + encodedFileName + ".thumb.jpg.?t="+Date.now();
                                    }
                                }
                                $(fileContainer).append('<img src="'+thumbLink+'" style="width:'+width+'px;height:'+height+'px;margin:auto;" /><br/>');
                            }
                            if (isTemp) {
                                $(fileContainer).append('<span class="filename">'+value+'</span>');
                            } else if (id !== undefined && id !== null) {
                                var encodedFileName = encodeURIComponent(value);
                                var link = args.contextPath + "/web/client/app/" + args.appId + "/" + args.appVersion + "/form/download/" + formDefId + "/" + id + "/" + encodedFileName + ".?attachment=true";
                                $(fileContainer).append('<a target="_blank" href="'+link+'"><span class="filename">'+value+'</span></a>');
                            }
                            $(td).find(".file_container").append(fileContainer);
                        });
                        if (!readonly) {
                            var delOpt = $('<span class="file_delete" href="#">'+args.msg_delete+'</span>');
                            delOpt.click(function() {
                                var filename = $(this).parent().find(".filename").text();
                                var exist = instance.getDataAtRowProp(row, prop);
                                if (exist !== undefined && exist !== null && exist !== "") {
                                    var newValues = []
                                    var values = exist.split(";");
                                    for (var i=0; i < values.length; i++) {
                                        if (values[i] !== filename) {
                                            newValues.push(values[i]);
                                        }
                                    }
                                    exist = newValues.join(";");
                                }
                                var existPath = instance.getDataAtRowProp(row, "_tempFilePathMap."+prop);
                                var inExistPath = false;
                                if (existPath !== undefined && existPath !== null && existPath.length > 0) {
                                    var newExistPath = [];
                                    for (var i=0; i < existPath.length; i++) {
                                        if (existPath[i].indexOf(filename) === -1) {
                                            newExistPath.push(existPath[i]);
                                        } else {
                                            inExistPath = true;
                                        }
                                    }
                                    existPath = newExistPath;
                                }
                                
                                instance.setDataAtRowProp(row, prop, exist, "edit");
                                instance.setDataAtRowProp(row, "_tempFilePathMap."+prop, existPath, "upload_field");
                                if (type === "image") {
                                    var existThumbPath = instance.getDataAtRowProp(row, "_tempFilePathMap."+prop+"_thumbnail");
                                    if (existThumbPath !== undefined && existThumbPath !== null && existThumbPath.length > 0) {
                                        var newExistThumbPath = [];
                                        for (var i=0; i < existThumbPath.length; i++) {
                                            if (existThumbPath[i].indexOf(filename) === -1) {
                                                newExistThumbPath.push(existThumbPath[i]);
                                            }
                                        }
                                        existThumbPath = newExistThumbPath;
                                    }
                                    instance.setDataAtRowProp(row, "_tempFilePathMap."+prop+"_thumbnail", existThumbPath, "upload_field");
                                }
                                
                                if (cellProperties.jsonProp.removeFile === "true") {
                                    var deletePath = instance.getDataAtRowProp(row, "_deleteFilePathMap."+prop);
                                    if (deletePath === undefined || deletePath === null) {
                                        deletePath = [];
                                    }
                                    if (!inExistPath) {
                                        deletePath.push(filename);
                                        if (type === "image") {
                                            deletePath.push(filename + ".thumb.jpg");
                                        }
                                    }
                                    instance.setDataAtRowProp(row, "_deleteFilePathMap."+prop, deletePath, "upload_field");
                                }
                            });
                            $(td).find(".filename_container").append(delOpt);
                        }
                        if (cellProperties['error'] !== undefined && cellProperties['error'] !== "") {
                            $(td).append('<div class="error" style="color:red;">'+cellProperties['error']+'</div>');
                        }
                        
                    } else if (cellProperties['error'] !== undefined && cellProperties['error'] !== "") {
                        $(td).html(''); 
                        $(td).append('<div class="error" style="color:red;">'+cellProperties['error']+'</div>');
                    } else {
                        Handsontable.renderers.TextRenderer.apply(this, arguments);
                    }
                };
                
                var urlRenderer = function (instance, td, row, col, prop, value, cellProperties) {
                    if (value) {
                        var urlSyntax = cellProperties.urlSyntax;
                        var url = urlSyntax;
                                
                        var res = urlSyntax.match(/\{([a-zA-Z0-9_]+)\}/g);
                        for (var r in res) {
                            var v = res[r].replace("{", "").replace("}", "");
                            try {
                                url = url.replace(res[r], instance.getDataAtRowProp(row, v));
                            } catch (err) {
                                url = url.replace(res[r], "");
                            }
                        }
                        
                        $(td).html('');
                        $(td).append("<div class=\"url_container\" style=\"margin:0 5px;\"></div>");
                        $(td).find(".url_container").append("<a target='_blank' href='"+url+"'>"+value+"</a>");
                    } else {
                        Handsontable.renderers.TextRenderer.apply(this, arguments);
                    }
                };
                
                var regexCustomvalidator = function(value, callback) {
                    var meta = this.instance.getCellMeta(this.row, this.col);
                    var regex = meta.regexValidator;
                    var rg = new RegExp(regex,'g');
                    setTimeout(function() {
                        if (rg.test(value)) {
                            callback(true);
                        } else {
                            callback(false);
                        }
                    }, 500);
                };
                
                var ccode = 97;
                for (var i in args.headers) {
                    var value = args.headers[i]["value"];
                    if (value.match(/\d+/g) !== null) {
                        formulaRefs['iternalfield' + String.fromCharCode(ccode++)] = value;
                    }
                }
                
                for (var i in args.headers) {
                    var h = args.headers[i];
                    
                    if (h["formatType"] !== "hidden") {
                        colHeaders.push(h["label"]);
                    }
                    if (h["formatType"] === "hidden" && h["format"] !== undefined && h["format"] !== "") {
                        dataSchema[h["value"]] = h["format"];
                    } else if (h["formatType"] === "checkbox") {
                        dataSchema[h["value"]] = null;
                        checkboxes.push(h["value"]);
                        if (args.data !== null && args.data !== undefined && args.data.length > 0) {
                            for (var k in args.data) {
                                if (args.data[k][h["value"]] === "" || args.data[k][h["value"]] === "null") {
                                    args.data[k][h["value"]] = "false";
                                }
                            }
                        }
                    } else {
                        dataSchema[h["value"]] = "";
                    }
                    
                    var cwidth = 10;
                    if (h["width"] !== null && h["width"] !== undefined && h["width"] !== "") {
                        try {
                            cwidth = parseInt(h["width"]);
                        } catch (werr){}
                        customColWidth = true;
                    }
                    colWidths.push(cwidth);
                    
                    var col = {
                        data : h["value"]
                    };
                    var config = null;
                    if (h["formatType"] !== null && h["formatType"] !== undefined && h["format"].indexOf("{{") !== -1 && h["format"].indexOf("}}") !== -1) {
                        config = h["format"].substring(h["format"].indexOf("{{") + 1, h["format"].lastIndexOf("}}") + 1 );
                        h["format"] = h["format"].substring(0, h["format"].indexOf("{{"));
                    }
                    if (h["formatType"] !== null && h["formatType"] !== undefined && h["formatType"] !== "") {
                        col["jFormatType"] = h["formatType"];
                        if (h["formatType"] === "custom" || h["formatType"] === "file" || h["formatType"] === "image" || h["formatType"] === "file" || h["formatType"] === "hidden" || h["formatType"] === "url") {
                            //ignore it
                        } else {
                            col["type"] = h["formatType"];
                        }
                        
                        if (h["format"] !== "") {
                            if (h["formatType"] === "file" || h["formatType"] === "image") {
                                col["renderer"] = fileRenderer;
                                col["editor"] = 'file';
                                col["formDefId"] = h["format"];
                                col["serviceUrl"] = args.serviceURL;
                                col["contextPath"] = args.contextPath;
                                if (col["formDefId"].indexOf("::") !== -1) {
                                    var temp = col["formDefId"].split("::");
                                    col["formDefId"] = temp[0];
                                    col["jsonProp"] = (eval("["+temp[1]+"]"))[0];
                                }
                            } else if (h["formatType"] === "autocomplete" || h["formatType"] === "dropdown") {
                                if (h["format"].indexOf("http") === 0) {
                                    col["source"] = function (query, process) { 
                                        $.ajax({ 
                                            url: h["format"], 
                                            dataType: 'json', 
                                            data: { query: query }, 
                                            success: function (response) { 
                                                process(response); 
                                            } 
                                        }); 
                                    };
                                    col["strict"] = true;
                                } else if (h["format"].indexOf("OPTIONS_USE_AJAX") !== -1) { 
                                    try {
                                        var options = eval("["+h["format"]+"]");
                                        col["ajaxSourceOptions"] = options[0];
                                        var keyOptions = eval(options[0]['OPTIONS']);
                                        col["keyOptions"]= keyOptions; 
                                        ajaxOptionsColumns[h["value"]] = options[0].OPTIONS_AJAX_CONTROL_FIELD;
                                    } catch (err){}
                                    col["source"] = function (query, process) { 
                                        var selected = hot.getSelected()[0];
                                        var row = selected[0];
                                        var col = selected[1];
                                        var meta = hot.getCellMeta(row, col);
                                        var o = meta.ajaxSourceOptions;
                                        var cf = o.OPTIONS_AJAX_CONTROL_FIELD.split(";");
                                        var cv = "";
                                        
                                        for (var i in cf) {
                                            if (cv !== "") {
                                                cv += ";";
                                            }
                                            cv += hot.getDataAtRowProp(row, cf[i]);
                                        }
                                        
                                        if (meta.ajaxControlValue === cv) {
                                            var labels = [];
                                            for (var i = 0; i < meta.keyOptions.length; i++) {
                                                labels.push(meta.keyOptions[i].label.trim());
                                            }
                                            process(labels); 
                                        } else {
                                            $.getJSON(args.contextPath + "/web/json/app/"+o.OPTIONS_AJAX_APP_ID+"/"+o.OPTIONS_AJAX_APP_VERSION+"/form/options",
                                                {
                                                    _dv: cv, 
                                                    _n: o.OPTIONS_AJAX_NONCE,
                                                    _bd: o.OPTIONS_AJAX_BINDER_DATA
                                                }, 
                                                function(data){
                                                    var labels = [];
                                                    var keyOptions = [];

                                                    for (var i=0, len=data.length; i < len; i++) {
                                                        labels.push(data[i].label.trim());
                                                        keyOptions.push({
                                                            value : data[i].value,
                                                            label : data[i].label.trim()
                                                        });
                                                    }
                                                    hot.setCellMeta(row, col, "ajaxControlValue", cv); 
                                                    hot.setCellMeta(row, col, "keyOptions", keyOptions); 
                                                    process(labels); 
                                                }
                                            );
                                        }
                                    };
                                    col["renderer"] = optionsRenderer;
                                    col["editor"] = h["formatType"];
                                    col["strict"] = false;
                                    col["validator"] = function(value, callback){callback(true);}; //remove validator
                                } else if (h["format"].indexOf("[") === 0 && h["format"].substr(h["format"].length - 1) === "]"){
                                    var options = [];
                                    var labels = [];
                                    try {
                                        options = eval(h["format"]);
                                        
                                        for (var o in options) {
                                            labels.push(options[o].label.trim());
                                        }
                                    } catch (err){}
                                    
                                    col["keyOptions"]= options;
                                    col["renderer"] = optionsRenderer;
                                    col["editor"] = h["formatType"];
                                    col["source"] = labels;
                                    col["strict"] = false;
                                    col["validator"] = function(value, callback){callback(true);}; //remove validator
                                } else if (h["format"].indexOf(";") !== -1 ) {
                                    col["source"] = h["format"].split(";");
                                    col["strict"] = true;
                                }
                            } else if (h["formatType"] === "numeric") {
                                var lang = 'en-US';
                                if ((h["format"].indexOf("0,0") !== -1 && h["format"].indexOf(".") === -1) 
                                        || h["format"].indexOf("0.000,0") !== -1
                                        || h["format"].indexOf("0.0,0") !== -1) {
                                    lang = "de-DE";
                                    h["format"] = h["format"].replace(",", "|");
                                    h["format"] = h["format"].replace(".", ",");
                                    h["format"] = h["format"].replace("|", ".");
                                }
                                
                                col["type"] = 'numeric';
                                col["numericFormat"] = {
                                    pattern: h["format"],
                                    culture: lang 
                                };
                            } else if (h["formatType"] === "date") {
                                var format = h["format"];
                                var dateFormat = format.split('|');
                                if (dateFormat.length === 2) {
                                    col["dateDisplayFormat"] = dateFormat[1];
                                    format = dateFormat[0];
                                    col["renderer"] = dateRenderer;
                                }
                                col["dateFormat"] = format.toUpperCase();
                            } else if (h["formatType"] === "time") {
                                col["timeFormat"] = h["format"];
                            } else if (h["formatType"] === "url") {
                                col["renderer"] = urlRenderer;
                                col["editor"] = "text";
                                col["urlSyntax"] = h["format"];
                            }
                        }
                    } else {
                        col["type"] = "text";
                    }
                    if (h["regexValidator"] !== null && h["regexValidator"] !== undefined && h["regexValidator"] !== "") {
                        col["regexValidator"] = h["regexValidator"];
                        col["validator"] = regexCustomvalidator;
                        col["allowInvalid"] = true;
                    }
                    if (h["formula"] !== null && h["formula"] !== undefined && h["formula"] !== "") {
                        oriFormulaColumns[h["value"]] = h["formula"];
                        var formula = h["formula"];
                        var rkeys = Object.keys(formulaRefs);
                        for (var r in rkeys) {
                            formula = formula.replace(new RegExp("(^|[^a-zA-Z0-9])("+methods.escapeRegex(formulaRefs[rkeys[r]])+")($|[^a-zA-Z0-9])", 'g'), "$1"+methods.escapeRegex(rkeys[r])+"$3");
                        }
                        formulaColumns[h["value"]] = formula;
                    } 
                    if (h["readonly"] === "true" || args.readonly === "true") {
                        col["readOnly"] = true;
                        col["editor"] = false;
                    }
                    
                    if (config !== null && config !== "") {
                        try {
                            config = "[" + config + "]";
                            var confObj = eval(config);
                            confObj = confObj[0];
                            col = $.extend( col, confObj);
                        } catch (err) {}
                    }
                    
                    if (h["formatType"] === "date" && (col["dateFormat"] === undefined || col["dateFormat"] === "")) {
                        col["dateFormat"] = "DD/MM/YYYY"; //handsontable default
                    } else if (h["formatType"] === "time" && (col["timeFormat"] === undefined || col["timeFormat"] === "")) {
                        col["timeFormat"] = "h:mm:ss a"; //handsontable default
                    }
                    
                    if (h["formatType"] === "date") {
                        col["correctFormat"] = true;
                        col["datePickerConfig"] = { i18n : i18n.datepicker};
                        if (args.isBE) {
                            col["isBE"] = args.isBE;
                            col["renderer"] = dateRenderer;
                            col["datePickerConfig"]['onDraw'] = function(picker) {
                                var yearselect = $(picker.el).find(".pika-select-year");
                                $(yearselect).find("option").each(function(){
                                    $(this).text(parseInt($(this).text()) + 543);
                                });
                                
                                $(yearselect).parent().contents().filter(function() {
                                    return this.nodeType === 3;
                                }).each(function(){
                                    this.textContent = parseInt(this.textContent) + 543;
                                });
                                
                                //convert the value in input field
                                var value = $(this.field).val();
                                if (value !== undefined && value !== null && value !== "") {
                                    var d = new Date(getDateFromFormat(value, methods.getDateFormat(this.format)));
                                    d = convertToBe(d);
                                    value = formatDate(d , methods.getDateFormat(this.format));
                                    $(this.field).val(value);
                                }
                            };
                        }
                    } else if (h["formatType"] === "time") {
                        col["correctFormat"] = true;
                    }
                    if (h["formatType"] !== "hidden") {
                        columns.push(col);
                    }
                }
                
                var fixRows = 0;
                var fixCols = 0;
                if (args.fixedColumnsLeft !== null && args.fixedColumnsLeft !== undefined && args.fixedColumnsLeft !== "") {
                    args.fixedColumnsLeft = args.fixedColumnsLeft.replace(/[^0-9]/g, "");
                    try { fixCols = parseInt(args.fixedColumnsLeft); } catch (err) {}
                }
                
                var adjustHeight = function(h) {
                    var height = $(thisObj).find(".ht_master .wtHider").height() + 50;
                    var maxheight = $(thisObj).data("maxheight");
                    var fixedHeight = false;
                    if (maxheight !== "") {
                        var temp = $("<div style=\"height:0px;overflow:hidden;\"><div class=\"spreadsheet-height\" style=\"height:" + maxheight + ";\"></div></div>");
                        $(thisObj).append(temp);
                        var maxValue = $(temp).find(".spreadsheet-height").height();
                        temp.remove();
                        
                        if (height > maxValue) {
                            height = maxValue;
                            fixedHeight = true;
                        }
                    }
                    
                    h.updateSettings({
                        height : height
                    });
                    h.render();
                    if (fixedHeight) {
                        $(thisObj).css("overflow", "hidden !important");
                    }
                };
                
                var settings = {
                    data: args.data,
                    dataSchema : dataSchema,
                    stretchH: 'all',
                    autoWrapRow: true,
                    rowHeaders: args.showRowNumber === "true",
                    height: 50,
                    allowInsertColumn: false,
                    allowRemoveColumn: false,
                    columns: columns,
                    colHeaders: colHeaders,
                    manualColumnResize: true,
                    manualRowResize: true,
                    fixedRowsTop: fixRows,
                    fixedColumnsLeft: fixCols,
                    columnSorting: args.headerSorting === "true",
                    sortIndicator: true,
                    searchBoolean: true,
                    undo : true
                };
                
                thisObj.find(".jsonDataContainer").val(JSON.stringify(args.data));
                
                var customEvents = {};
                
                var events = {
                    afterSelection: function (r, c, r2, c2) {
                        if ($(thisObj).hasClass("mobile")) {
                            var ht = this;
                            var activeEditor = ht.getActiveEditor();
                            if (activeEditor !== null && activeEditor !== undefined) {
                                activeEditor.finishEditing();
                            }
                            if (c === c2) {
                                setTimeout(function () {
                                    if (!$(thisObj).hasClass("ht__selection--columns")) {
                                        var editor = ht.getActiveEditor();
                                        if (editor !== null && editor !== undefined) {
                                            editor.enableFullEditMode();
                                            editor.beginEditing();
                                        }
                                    }
                                }, 100);
                            }
                        }
                        if (customEvents['afterSelection'] !== undefined) {
                            customEvents['afterSelection'](r, c, r2, c2);
                        }
                    },
                    afterBeginEditing : function (row, col) {
                        var ht = this;
                        var meta = ht.getCellMeta(row, col);
                        if (meta.keyOptions !== undefined) {
                            var value = ht.getDataAtCell(row, col);
                            for (var o in meta.keyOptions) {
                                if (value === meta.keyOptions[o].value) {
                                    ht.setDataAtCell(row, col, meta.keyOptions[o].label.trim(), "key-value-options-label");
                                    if (meta.filter === undefined || meta.filter) {
                                        var activeEditor = ht.getActiveEditor();
                                        setTimeout(function(){
                                            activeEditor.queryChoices(meta.keyOptions[o].label.trim());
                                        }, 100);
                                    }
                                    break;
                                }
                            }
                        }
                        if (customEvents['afterBeginEditing'] !== undefined) {
                            customEvents['afterBeginEditing'](row, col);
                        }
                    },
                    afterChange: function (change, source) {
                        var ht = this;
                        if (source === "formula" || source === "checkbox") {
                            return;
                        }
                        
                        if (change !== null && change !== undefined && !$.isArray(change[0])) {
                            change = [change];
                        }
                        
                        if (source === "edit") {
                            var col = ht.propToCol(change[0][1]);
                            var meta = ht.getCellMeta(change[0][0], col);
                            if (meta.keyOptions !== undefined) {
                                var label = change[0][3];
                                var isFound = false;
                                for (var o in meta.keyOptions) {
                                    if (label.trim() === meta.keyOptions[o].label.trim()) {
                                        ht.setDataAtRowProp(change[0][0], change[0][1], meta.keyOptions[o].value, "key-value-options");
                                        isFound = true;
                                        break;
                                    }
                                }
                                if (!isFound) {
                                    ht.setDataAtRowProp(change[0][0], change[0][1], "", "key-value-options");
                                }
                            }
                            if (checkboxes.length > 0) {
                                for (var j in checkboxes) {
                                    var tempValue = ht.getDataAtRowProp(change[0][0], checkboxes[j]);
                                    if (tempValue === null) {
                                        ht.setDataAtRowProp(change[0][0], checkboxes[j], "false", "checkbox");
                                    }
                                }
                            }
                        }
                        
                        var d = this.getSourceData();
                        var calculate = function(row, rowData, changedFields) {
                            var parser = new formulaParser.Parser();
                            parser.on('callVariable', function(name, done) {
                                if (formulaRefs[name] !== undefined) {
                                    name = formulaRefs[name];
                                }
                                var value;
                                if (rowData[name] !== null && rowData[name] !== undefined) {
                                    value = rowData[name];
                                } else {
                                    value = "";
                                }
                                var tcol = ht.propToCol(name);
                                var tmeta = ht.getCellMeta(change[0][0], tcol);
                                var type = tmeta.type;
                                if (type === "numeric") {
                                    if (value === "") {
                                        value = 0;
                                    }
                                    var number = numbro().unformat(value);
                                    if (number === undefined) {
                                        done(value);
                                    } else {
                                        done(number);
                                    }
                                } else if (type === "date") {
                                    var dateFormat = tmeta.dateFormat;
                                    if (dateFormat !== null && dateFormat !== undefined && dateFormat !== "" && value !== "") {
                                        var currentDate = moment(value, dateFormat);
                                        currentDate = currentDate.toDate();
                                        if (currentDate !== null && currentDate !== undefined){
                                            value = currentDate.getMonth() + 1 + "/" + currentDate.getDate() + "/" + currentDate.getFullYear(); 
                                        }
                                    }
                                    done(value);
                                } else {
                                    done(value);
                                }
                            });
                            var newChangedFields = [];

                            for (var k in keys) {
                                try {
                                    var key = keys[k];
                                    var currentFormula = oriFormulaColumns[key];
                                    var hasChangedFieldInFormula = false;
                                    
                                    for (var cf in changedFields) {
                                        var re = new RegExp("([^'\"a-zA-Z0-9]|^)"+changedFields[cf]+"([^'\"a-zA-Z0-9]|$)");
                                        if (currentFormula.match(re) !== null) {
                                            hasChangedFieldInFormula = true;
                                            break;
                                        }
                                    }
                                    
                                    if (hasChangedFieldInFormula) {
                                        var result = parser.parse(formulaColumns[key]);
                                        var value = result.result;
                                        rowData[key] = value;
                                        ht.setDataAtRowProp(row, key, value, "formula");
                                        newChangedFields.push(key);
                                    }
                                } catch (err) {}
                            }
                            
                            if (newChangedFields.length > 0) {
                                calculate(row, rowData, newChangedFields);
                            }
                        };
                        
                        var keys = Object.keys(formulaColumns);
                        if (keys.length > 0) {
                            if (source !== 'loadData' && source !== "key-value-options-label") {
                                var ccol = ht.propToCol(change[0][1]);
                                var meta = ht.getCellMeta(change[0][0], ccol);
                                if (!(source === 'edit' && meta.keyOptions !== undefined)) {
                                    for (var i in change) {
                                        var row = change[i][0];
                                        calculate(row, d[row], [change[i][1]]);
                                    }
                                }
                            }
                        }
                        
                        //handle ajax option change event
                        var akeys = Object.keys(ajaxOptionsColumns);
                        if (akeys.length > 0) {
                            if (source !== 'loadData' && source !== 'key-value-options-label') {
                                for (var i in change) {
                                    var row = change[i][0];
                                    var prop = change[i][1];
                                    var isLabel = null;
                                    
                                    for (var ck in akeys) {
                                        var k = akeys[ck];
                                        var controlFields = ajaxOptionsColumns[k].split(";");
                                        if ($.inArray(prop, controlFields) !== -1) {
                                            if (isLabel === null) {
                                                var tcol = ht.propToCol(prop);
                                                var meta = ht.getCellMeta(row, tcol);
                                                if (meta.keyOptions !== undefined && source !== "key-value-options") {
                                                    isLabel = true;
                                                } else {
                                                    isLabel = false;
                                                }
                                            }
                                            if (!isLabel) {
                                                var t2col = ht.propToCol(k);
                                                var t2meta = ht.getCellMeta(row, t2col);
                                                if (t2meta.ajaxControlValue !== change[i][3]) {
                                                    ht.setDataAtRowProp(row, k, "", "ajax-options-control-changed");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                        d = this.getSourceData();
                        
                        if (args.readonly !== "true" && args.minSpareRows !== "0") {
                            try {
                                var row = parseInt(args.minSpareRows);
                                if (row > 0) {
                                    var originalTotal = eval(thisObj.find(".jsonDataContainer").val()).length;
                                    var totalRows = d.length;
                                    if (change !== null && change[change.length - 1][0] >= originalTotal) {
                                        originalTotal = change[change.length - 1][0] + 1;
                                    }
                                    if (totalRows > originalTotal) {
                                        d = d.slice(0, ((totalRows - originalTotal) * -1));
                                    }
                                }
                            } catch (err) {}
                        }
                        
                        if (customEvents['afterChange'] !== undefined) {
                            customEvents['afterChange'](change, source);
                        }
                        
                        var newData = [];
                        for (var i = 0; i < d.length; i++) {
                            var ni = this.toPhysicalRow(i);
                            newData.push(d[ni]);
                        }
                        d = newData;

                        thisObj.data("gridDataObject", d);
                        
                        thisObj.find(".jsonDataContainer").val(JSON.stringify(d));
                        adjustHeight(this);
                        thisObj.trigger("change");
                    },
                    afterCreateRow: function (index, amount, source) {
                        if (customEvents['afterCreateRow'] !== undefined) {
                            customEvents['afterRowResize'](index, amount, source);
                        }
                        var originalTotal = eval(thisObj.find(".jsonDataContainer").val()).length;
                        if (index < originalTotal) {
                            var d = this.getSourceData();
                            
                            var newData = [];

                            for (var i = 0; i < d.length - args.minSpareRows; i++) {
                                var ni = this.toPhysicalRow(i);
                                newData.push(d[ni]);
                            }
                            d = newData;
                            thisObj.data("gridDataObject", d);
                            thisObj.find(".jsonDataContainer").val(JSON.stringify(d));
                            adjustHeight(this);
                            thisObj.trigger("change");
                        }
                    },
                    afterRemoveRow : function (index, amount) {
                        var d = this.getSourceData();
                        if (args.readonly !== "true") {
                            try {
                                var row = parseInt(args.minSpareRows);
                                if (row > 0){
                                    var totalRow = d.length + amount;
                                    var nonSpare = totalRow - row;
                                    var removedEmptyRow = (index + amount >= nonSpare)?(index + amount - nonSpare):0;
                                    var remainingEmptyRow = row - removedEmptyRow;
                                    if (remainingEmptyRow > 0) {
                                        d = d.slice(0, (remainingEmptyRow * -1));
                                    }
                                }
                            } catch (err) {}
                        }
                        
                        if (customEvents['afterRemoveRow'] !== undefined) {
                            customEvents['afterRemoveRow'](index, amount);
                        }
                        
                        var newData = [];
                        for (var i = 0; i < d.length; i++) {
                            var ni = this.toPhysicalRow(i);
                            newData.push(d[ni]);
                        }
                        d = newData;

                        thisObj.data("gridDataObject", d);
                        
                        thisObj.find(".jsonDataContainer").val(JSON.stringify(d));
                        adjustHeight(this);
                        thisObj.trigger("change");
                    },
                    afterRowResize : function (currentRow, newSize, isDoubleClick) {
                        if (customEvents['afterRowResize'] !== undefined) {
                            customEvents['afterRowResize'](currentRow, newSize, isDoubleClick);
                        }
                        
                        adjustHeight(this);
                    },
                    afterColumnSort: function (prevSortConfig, currentSortConfig, isValid) {
                        var d = thisObj.data("gridDataObject");
                        var newData = [];

                        for (var i = 0; i < d.length; i++) {
                            var ni = this.toPhysicalRow(i);
                            newData.push(d[ni]);
                        }
                        d = newData;

                        if (customEvents['afterColumnSort'] !== undefined) {
                            customEvents['afterColumnSort'](prevSortConfig, currentSortConfig, isValid);
                        }
                        thisObj.data("gridDataObject", d);
                        thisObj.find(".jsonDataContainer").val(JSON.stringify(d));
                        adjustHeight(this);
                        thisObj.trigger("change");
                    },
                    beforeKeyDown: function (e) {
                        var ht = this;
                        var editor = ht.getActiveEditor();
                        if (editor !== undefined && editor.$datePicker !== undefined && editor.$datePicker.isVisible()) {
                            switch(e.keyCode){
                                case 37:
                                    e.preventDefault();
                                    editor.$datePicker.adjustDate('subtract', 1);
                                    e.stopImmediatePropagation();
                                    break;
                                case 38:
                                    e.preventDefault();
                                    editor.$datePicker.adjustDate('subtract', 7);
                                    e.stopImmediatePropagation();
                                    break;
                                case 39:
                                    e.preventDefault();
                                    editor.$datePicker.adjustDate('add', 1);
                                    e.stopImmediatePropagation();
                                    break;
                                case 40:
                                    e.preventDefault();
                                    editor.$datePicker.adjustDate('add', 7);
                                    e.stopImmediatePropagation();
                                    break;
                            }
                        }
                        
                        if (customEvents['beforeKeyDown'] !== undefined) {
                            customEvents['beforeKeyDown'](e);
                        }
                    },
                    afterRender: function(isForced) {
                        var container = $(thisObj).closest(".subform-cell");
                        if ($(container).length === 0) {
                            container = $(thisObj).closest(".form-cell");
                        }
                        
                        if ($(container).find(".form-error-message").length > 0) {
                            var ht = this;
                            var rows = [];
                            
                            var data = thisObj.data("gridDataObject");
                            if (data !== undefined) {
                                for (var i = 0; i < data.length; i++) {
                                    rows.push(i);
                                }

                                ht.validateRows(rows);
                            }
                        }
                        if (customEvents['afterRender'] !== undefined) {
                            customEvents['afterRender'](isForced);
                        }
                    }
                };
                
                if (customColWidth) {
                    settings = $.extend( settings, {
                        colWidths : colWidths
                    });
                }
                
                if (args.readonly === "true") {
                    settings = $.extend( settings, {
                        allowInsertRowBoolean : false,
                        allowRemoveRowBoolean : false
                    });
                } else {
                    var contextMenu = {};
                    
                    if (args.disabledAdd !== "true") {
                        contextMenu["row_above"] = {name: args.msg_row_above};
                        contextMenu["row_below"] = {name: args.msg_row_below};
                        settings = $.extend( settings, {
                            allowInsertRowBoolean : true
                        });
                    } else {
                        settings = $.extend( settings, {
                            allowInsertRowBoolean : false
                        });
                    }
                    
                    if (args.disabledDelete !== "true") {
                        contextMenu["remove_row"] = {name: args.msg_remove_row};
                        settings = $.extend( settings, {
                            allowRemoveRowBoolean : true
                        });
                    } else {
                        settings = $.extend( settings, {
                            allowRemoveRowBoolean : false
                        });
                    }
                    
                    if (Object.keys(contextMenu).length> 0) {
                        contextMenu["hsep1"] = "---------";
                    }
                    contextMenu["undo"] = {name: args.msg_undo};
                    contextMenu["redo"] = {name: args.msg_redo};
                    
                    var minRows = 0;
                    if (args.validateMinRow !== null && args.validateMinRow !== undefined && args.validateMinRow !== "") {
                        args.validateMinRow = args.validateMinRow.replace(/[^0-9]/g, "");
                        try { minRows = parseInt(args.validateMinRow); } catch (err) {}
                    }
                    var minSpareRows = 1;
                    if (args.disabledAdd !== "true" && args.minSpareRows !== null && args.minSpareRows !== undefined && args.minSpareRows !== "") {
                        args.minSpareRows = args.minSpareRows.replace(/[^0-9]/g, "");
                        try { 
                            var tempMinSpareRows = parseInt(args.minSpareRows); 
                            minSpareRows = tempMinSpareRows;
                        } catch (err) {}
                    } else if (args.disabledAdd === "true") {
                        minSpareRows = 0;
                        args.minSpareRows = 0;
                    }
                        
                    settings = $.extend( settings, {
                        manualRowMove: true,
                        minRows: minRows,
                        minSpareRows: minSpareRows,
                        copyPaste: true,
                        contextMenu: {
                            items : contextMenu
                        }
                    });
                    
                    if (args.validateMaxRow !== null && args.validateMaxRow !== undefined && args.validateMaxRow !== "") {
                        args.validateMaxRow = args.validateMaxRow.replace(/[^0-9]/g, "");
                        try { 
                            var validateMaxRow = parseInt(args.validateMaxRow);
                            settings = $.extend( settings, {
                                maxRows : validateMaxRow
                            });
                        } catch (err) {}    
                    }
                }
                
                if (args.customSettings !== null && args.customSettings !== undefined && args.customSettings.startsWith("{") && args.customSettings.endsWith("}") ) {
                    try {
                        var customSettings = "[" + args.customSettings + "]";
                        var customSettingsObj = eval(customSettings);
                        settings = $.extend( settings, customSettingsObj[0]);
                        
                        for (var e in events) {
                            if (settings[e] !== undefined) {
                                customEvents[e] = settings[e];
                            }
                        }
                    } catch (err) {}
                }
                settings = $.extend( settings, events);
                
                var container = document.getElementById($(thisObj).attr("id"));
                hot = new Handsontable(container, settings);
                
                //used to simulate and trigger a mouse event
                var fireMouseEvent = function(element, eventName) {
                    var options = {
                        bubbles: true,
                        cancelable: (eventName !== 'mousemove'),
                        view: window,
                        detail: 0,
                        screenX: 0,
                        screenY: 0,
                        clientX: 1,
                        clientY: 1,
                        ctrlKey: false,
                        altKey: false,
                        shiftKey: false,
                        metaKey: false,
                        button: 0,
                        relatedTarget: undefined
                    };
                    var event;
                    if (MouseEvent) {
                        event = new MouseEvent(eventName,options);
                    } else {
                        event = document.createEventObject();
                    }
                    if (element.dispatchEvent) {
                        element.dispatchEvent(event);
                    } else {
                        element.fireEvent('on' + eventName, event);
                    }
                };
                
                //used to simulate and trigger a touch event
                var fireTouchEvent = function(element, type, touches) {
                    var event;
                    if (TouchEvent) {
                        event = new TouchEvent(type, {
                          touches: touches,
                          view: window,
                          cancelable: true,
                          bubbles: true
                        });
                    } else {
                        event = new UIEvent(type, {
                            bubbles: true,
                            cancelable: false,
                            detail: 1
                        });
                        event.changedTouches = touches;
                        event.targetTouches = touches;
                        event.touches = touches;
                    }

                    if (element.dispatchEvent) {
                        element.dispatchEvent(event);
                    } else {
                        element.fireEvent('on' + eventName, event);
                    }
                };
                
                /* for mobile */
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    $("html").addClass("ismobile");
                    
                    //for context menu
                    $(document).off("touchstart", ".htContextMenu .wtHolder td");
                    $(document).on("touchstart", ".htContextMenu .wtHolder td", function(){
                        var table = $(this).closest(".handsontable");
                        setTimeout(function() {fireMouseEvent($(table).find(".wtHolder td.current")[0], "mousedown")}, 100);
                    });

                    //added to allow scroll the dropdown menu
                    var isMove = false;
                    $(document).off("touchstart.custom", ".handsontableInputHolder .handsontable .wtHolder");
                    $(document).on("touchstart.custom", ".handsontableInputHolder .handsontable .wtHolder", function(){
                        $(this).closest(".handsontable").removeClass("clickable");
                        isMove = false;
                    });
                    $(document).off("touchmove.custom", ".handsontableInputHolder .handsontable .wtHolder");
                    $(document).on("touchmove.custom", ".handsontableInputHolder .handsontable .wtHolder", function(){
                        isMove = true;
                    });
                    $(document).off("touchend.custom", ".handsontableInputHolder .handsontable .wtHolder");
                    $(document).on("touchend.custom", ".handsontableInputHolder .handsontable .wtHolder", function(event){
                        if (!isMove) {
                            $(this).closest(".handsontable").addClass("clickable");
                            
                            var x = event.changedTouches[0].clientX;
                            var y = event.changedTouches[0].clientY;
                            if (event.changedTouches[0].originalEvent) {
                                x = event.changedTouches[0].originalEvent.clientX;
                                y = event.changedTouches[0].originalEvent.clientY;
                            }
                            
                            var element = document.elementFromPoint(x, y);
                            fireTouchEvent(element, "touchstart", event.changedTouches);
                        }
                    });
                }
                
                //update the width to follow the container width
                var updateWidth = function() {
                    $(thisObj).closest(".spreadsheet_container").addClass("resize");
                    
                    hot.updateSettings({
                        width: $(thisObj).closest(".spreadsheet_container").width() - 1
                    });
                    hot.render();
                    adjustHeight(hot); 
                };
                
                //using timeout to update the width during window resize
                var resizeTimeoutHolder = null;
                var resize = function() {
                    $(thisObj).closest(".spreadsheet_container").addClass("resize");
                    
                    //clear the previous timeout if exist, to prevent frequent update
                    if (resizeTimeoutHolder) {
                        clearTimeout(resizeTimeoutHolder);
                    }
                    resizeTimeoutHolder = setTimeout(function() {
                        updateWidth();
                        
                        //update width another time after fully stop resize in case the previous width is wrongly calculated
                        resizeTimeoutHolder = setTimeout(function() {
                            updateWidth();

                            //reset the overflow after all resize done
                            $(thisObj).closest(".spreadsheet_container").removeClass("resize");
                        }, 500);
                    }, 1);
                };
                
                $(window).resize(function(){
                    resize();
                });
                
                //for page just loaded and everything haven't render correctly
                var timeoutresize = function() {
                    setTimeout(function(){
                        if ($(thisObj).closest(".subform-cell, .form-cell").width() === 0) {
                            timeoutresize();
                        } else {
                            resize();
                        }
                    }, 100);
                };
                
                timeoutresize();
            });
        },
        escapeRegex : function(s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        },
        getDateFormat : function(f) {
            f = f.toLowerCase();
            f = f.replace(new RegExp("m", 'g'), "M");
            return f;
        }
    };
    
    $.fn.jwspreadsheet = function( method ) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.jwspreadsheet' );
        }

    };

})( jQuery );