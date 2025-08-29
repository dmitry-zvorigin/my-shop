import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

/** Достаём HTTP-статус из разных форматов ошибок */
function getStatus(err) {
  if (!err) return undefined;
  // наш HttpError из http.js
  if (typeof err.status === "number") return err.status;
  // иногда кладут в err.response.status (axios)
  if (typeof err?.response?.status === "number") return err.response.status;
  return undefined;
}

/** Словарь человеко-понятных описаний */
const MESSAGES = {
  404: {
    title: "Страница не найдена",
    desc: "Похоже, ссылка неверна или ресурс был перемещён.",
    actions: [{ to: "/", label: "На главную", variant: "primary" }, { to: "/catalog", label: "В каталог" }],
  },
  403: {
    title: "Доступ запрещён",
    desc: "У вас нет прав для просмотра этой страницы.",
    actions: [{ to: "/", label: "На главную", variant: "primary" }],
  },
  401: {
    title: "Требуется авторизация",
    desc: "Войдите в аккаунт, чтобы продолжить.",
    actions: [{ to: "/login", label: "Войти", variant: "primary" }, { to: "/", label: "На главную" }],
  },
  500: {
    title: "Внутренняя ошибка сервера",
    desc: "Мы уже работаем над решением. Попробуйте позже.",
    actions: [{ to: "/", label: "На главную", variant: "primary" }],
  },
  0: {
    title: "Нет соединения",
    desc: "Проверьте интернет и попробуйте ещё раз.",
    actions: [],
  },
  default: {
    title: "Что-то пошло не так",
    desc: "Неожиданная ошибка. Попробуйте обновить страницу.",
    actions: [{ to: "/", label: "На главную", variant: "primary" }],
  },
};

export default function PageErrorFallback({ error, resetErrorBoundary }) {
  console.log(error);
  const navigate = useNavigate();
  const status = getStatus(error);
  const key = (status ?? 0) in MESSAGES ? status ?? 0 : "default";
  const { title, desc, actions } = MESSAGES[key];

  const showRetry = status === 0 || (status && status >= 500); // retry уместен для сети/5xx

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-medium text-gray-600">{title}</h1>
        <p className="text-9xl font-medium text-gray-600">{status ? `${status}` : "Ошибка"}</p>
        
        <p className="text-gray-600 max-w-prose">{desc}</p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {showRetry && (
            <button
              onClick={resetErrorBoundary}
              className="text-white rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              Повторить
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className="text-white rounded-lg px-4 py-2 transition bg-gradient-to-b from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500"
          >
            Назад
          </button>
          {actions.map((a) => (
            <Link
              key={a.to + a.label}
              to={a.to}
              className={clsx(
                "text-white rounded-lg px-4 py-2 transition bg-gradient-to-b from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500",
              )}
            >
              {a.label}
            </Link>
          ))}
        </div>

        {/* Детали для отладки — по желанию, можно спрятать за disclosure */}
        {/* <pre className="mt-4 max-w-full overflow-auto text-xs text-gray-500">
          {String(error?.message ?? error)}
        </pre> */}
      </div>
    </div>
  );
}