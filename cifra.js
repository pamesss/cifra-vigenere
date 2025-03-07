//efeito da barra de progresso no topo do site
document.querySelector(".content").addEventListener("scroll", function() {
    var scrollTop = this.scrollTop;
    var scrollHeight = this.scrollHeight - this.clientHeight;
    var scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
});