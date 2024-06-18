<ul id="addon-action-buttons">
    <li class="deactiveMfa"><button onclick="deactiveMfa()">@@app.edm.label.deactiveMfa@@</button></li>
</ul>
<script>
    function deactiveMfa(){
        if (confirm('@@app.edm.label.deactiveMfa.confirmation@@')) {
            var callback = {
                success : function(response) {
                    if ("true" == response) {
                        $(".deactiveMfa").remove();
                        alert("@@app.edm.message.userdeactiveMfa@@");
                    } else {
                        alert("@@app.edm.message.userdeactiveMfaFailed@@");
                    }
                }
            }
            var request = ConnectionManager.post('${url!}', callback);
        }
    }
</script>