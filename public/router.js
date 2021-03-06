function router() {
    let routes = {};

    function get(path, callback) {
        routes[path] = callback;
    }

    function setDefault(callback) {
        routes.default = callback
    }

    function redirect(path) {
        const url = window.location.origin + path;
        window.history.pushState(null, null, url);
        navigate(url);
    }

    function handleClick(event) {
        if (
          "external" in event.target.dataset ||
          event.button !== 0 ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey ||
          event.ctrlKey
        )
          return;
        if (event.target.tagName === "A") {
          event.preventDefault();
          window.history.pushState(null, null, event.target.href);
          navigate(event.target.href);
        }
      }

    function navigate(url) {
        const parsedUrl = new URL(url);
        const basePath = parsedUrl.pathname.split("?")[0];
        const callback = routes[basePath] || routes.default;
        callback({url: parsedUrl, redirect});
    }

    function redirect(path) {
        const url = window.location.origin + path;
        window.history.pushState(null, null, url);
        navigate(url);
    }


    function handlePop() {
        navigate(window.location);
    }

    function listen() {
        window.addEventListener("click", handleClick);
        window.addEventListener("popstate", handlePop);
        console.log(window.location);
        navigate(window.location);
    }

    function close() {
        window.removeEventListener("click", handleClick);
        window.removeEventListener("popstate", handlePop);
    }

    return {get, listen, close, setDefault};
}
export default router;
