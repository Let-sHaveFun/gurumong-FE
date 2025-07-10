import { ExamIcon } from '@vapor-ui/icons';

export const NoResult = () => {
  return (
    <div className="flex flex-col items-center gap-[10px] text-gray-300 mt-[60px]">
      <ExamIcon size={60} />
      <p>내 주위에 들을 이야기 조각이 없어요!</p>
    </div>
  );
};
