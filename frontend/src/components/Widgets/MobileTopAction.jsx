import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Shared/Container";
import { ArrowLeftIcon, ChatBubbleLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function MobileTopAction() {
  // const [q, setQ] = useState("");
  // const navigate = useNavigate();

  // function onSubmit(e) {
  //   e.preventDefault();
  //   if (!q.trim()) return;
  //   navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  // }

  return (
    <div className="bg-white border-b border-gray-200 shadow">
      <Container>
        <div className="py-2 flex items-center gap-2">
          {/* Бургер или кнопка каталога */}
          <button
            type="button"
            aria-label="Открыть каталог"
            className="shrink-0 rounded-lg p-2 bg-gray-100 aspect-square h-[42px] justify-center items-center flex"
          >
            <ArrowLeftIcon width={20} className="text-gray-500"/>
          </button>

          <form className="flex-1 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск по сайту"
                  className="w-full border px-4 py-2 pl-10 focus:outline-orange-500 outline-none border-gray-200 hover:shadow hover:bg-white rounded-lg bg-gray-100"
                />
                <MagnifyingGlassIcon width={20} height={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
              </div>
          </form>

          {/* Иконка чата/профиля по вкусу */}
          <button
            type="button"
            aria-label="Профиль"
            className="shrink-0 rounded-lg bg-gray-100 aspect-square p-3 h-[42px]"
          >
            <ChatBubbleLeftIcon height={20} className="text-gray-500"/>
          </button>
        </div>
      </Container>
    </div>
  );
}
