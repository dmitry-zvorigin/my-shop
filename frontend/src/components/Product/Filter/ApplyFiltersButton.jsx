export default function ApplyFiltersButton({ top, onClick }) {
  return (
    <>
      <button className="apply-filters-btn" style={{ top }} onClick={onClick}>
        <span className="z-10">Показать</span>
      </button>
      <style>{`
        .apply-filters-btn{
          position: absolute;
          right: 1px;
          transform: translate(100%, -50%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 64px;
          width: 128px;
          color: #ffffff;
          font-weight: 600;
          border-radius: 12px;
          background: transparent;
          box-shadow: none;
          z-index: 20;
        }
        .apply-filters-btn::after{
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          border-bottom: 2px solid #f97316;
          background: linear-gradient(#ffb347, #f79a1f);
          z-index: 1;
        }
        .apply-filters-btn::before{
          content: "";
          position: absolute;
          width: 28px;
          height: 28px;
          left: -14px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          background: linear-gradient(#ffb347, #f79a1f);
          border-bottom: 2px solid #f97316;
          border-bottom-left-radius: 6px;
          z-index: 0;
        }
        .apply-filters-btn:hover{
          box-shadow: 0 14px 30px rgba(0,0,0,.2);
        }
        .apply-filters-btn:hover::after{
          border-bottom-color: #fb923c;
          background: linear-gradient(#ffc064, #f6a13e);
        }
        .apply-filters-btn:hover::before{
          border-bottom-color: #fb923c;
          background: linear-gradient(#ffc064, #f6a13e);
        }
      `}</style>
    </>
  );
}


