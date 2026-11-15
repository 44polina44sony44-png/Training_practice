const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const menuToggle = document.getElementById('menuToggle');
const toast = document.getElementById('toast');

let toastTimer;

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function closeMenu() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
    const opened = sidebar?.classList.toggle('open');

    overlay?.classList.toggle('active', Boolean(opened));
    menuToggle?.setAttribute('aria-expanded', String(Boolean(opened)));
}

menuToggle?.addEventListener('click', toggleMenu);

overlay?.addEventListener('click', closeMenu);

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.getElementById('paymentForm')?.addEventListener('submit', event => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;

    showToast('Платёжное поручение успешно сформировано.');
});

document.getElementById('statementForm')?.addEventListener('submit', event => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;

    const from = document.getElementById('dateFrom').value;
    const to = document.getElementById('dateTo').value;

    if (from > to) {
        showToast('Дата начала периода не может быть позже даты окончания.');
        return;
    }

    showToast('Выписка сформирована.');
});

document.querySelectorAll('[data-request]').forEach(button => {
    button.addEventListener('click', () => {
        showToast(`Заявка «${button.dataset.request}» принята.`);
    });
});

document.querySelectorAll('[data-download]').forEach(button => {
    button.addEventListener('click', () => {
        showToast(`Документ «${button.dataset.download}» подготовлен.`);
    });
});

const dateNode = document.getElementById('todayDate');

if (dateNode) {
    dateNode.textContent = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date());
}