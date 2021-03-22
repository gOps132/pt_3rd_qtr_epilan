
const btn_scroll = document.getElementById("btn-scroll-to-top");

btn_scroll.addEventListener("click", () => {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth"
	});
});