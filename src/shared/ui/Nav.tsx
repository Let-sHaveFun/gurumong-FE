import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <footer className="fixed bottom-0 w-full bg-white h-[60px] border-t mx-auto max-w-[393px]">
      <nav className="flex justify-between items-center h-full relative bg-white ">
        <Link to="/" className="flex-1 flex justify-center">
          <span>지도</span>
        </Link>
        {/* TODO: QR UI 를 따로 빼서 관리하는게 나을듯! */}
        <Link to="/qr" className="flex-1 flex justify-center">
          {/* 볼록한 QR 코드 영역 */}
          <div className="absolute bottom-0 w-[100px] h-[40px] bg-white rounded-t-[40px] flex items-center justify-center -translate-y-[56px] border-l border-r border-t border-gray-200 z"></div>
          <img src="/qr.png" alt="qr" className="w-[100px] h-[80px] rounded-t-[40px] absolute bottom-0" />
        </Link>
        <Link to="/" className="flex-1 flex justify-center">
          <span>마이페이지</span>
        </Link>
      </nav>
    </footer>
  );
}
