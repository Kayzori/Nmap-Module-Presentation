let currentRequest = 0;

export async function navigate(page) {
    const main = document.getElementById("main");
    const requestId = ++currentRequest;

    if (!main) return;

    const pageKey = page.toLowerCase(); // only for comparing

    try {
        const response = await fetch(`pages/${encodeURIComponent(page)}.html`);

        if (!response.ok)
            throw new Error("Page not found");

        const html = await response.text();

        if (requestId !== currentRequest) return;

        main.innerHTML = html;

        document.querySelectorAll(".sidebar-nav-link").forEach(link => {
            const linkPage = decodeURIComponent(
                link.getAttribute("href").slice(1)
            ).toLowerCase();

            link.classList.toggle("active", linkPage === pageKey);
        });

    } catch (error) {
        if (requestId !== currentRequest) return;

        main.innerHTML = "<h1>404 - Page not found</h1>";

        document.querySelectorAll(".sidebar-nav-link").forEach(link => {
            link.classList.remove("active");
        });
    }
}