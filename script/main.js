
import { navigate } from "./router.js";

function router() {
    const page = location.hash.slice(1) || "Slide1";

    navigate(decodeURIComponent(page));
}

// Initial page
router();

// Listen for navigation changes
window.addEventListener("hashchange", router);
