import Onboarding1 from '@/assets/onboarding1.png';
import Onboarding2 from '@/assets/onboarding2.png';
import Onboarding3 from '@/assets/onboarding3.png';
import { cn } from '@/lib/utils';
import { useDormungStore } from '@/shared/store';
import { FixedBottom } from '@/shared/ui';
import { Button, Flex, Text } from '@vapor-ui/core';
import { BackPageOutlineIcon } from '@vapor-ui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ONBOARDING_LIST = [
  '도르멍드르멍은\n 오디오 스토리텔링을\n 기반으로 한 여행 서비스에요.',
  '읽기 귀찮은 안내판 대신,\n 흥미로운 제주의 이야기를\n 제주 방언으로 들으며 걸어보세요!',
  '이야기를 다 들으면\n 제주의 이야기조각을 드릴게요.\n 여행동안 모든 조각을 다 모아볼까요?',
];

export function OnboardingPage() {
  const navigate = useNavigate();

  const updateIsFirstVisit = useDormungStore((state) => state.updateIsFirstVisit);

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleStart = () => {
    updateIsFirstVisit(false);
    navigate('/');
  };

  return (
    <div className="relative h-screen w-full px-4">
      <header className="py-3 my-4">
        <Flex gap="$100" alignItems="center" justifyContent="center" className="relative">
          {currentStep > 1 && (
            <BackPageOutlineIcon
              width={24}
              height={24}
              className="text-white z-[1] absolute left-0"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            />
          )}
          <ul className="flex gap-2">
            <li className={cn('w-2 h-2 bg-white rounded-full z-[1]', currentStep === 1 && 'bg-[#FCD666]')} />
            <li className={cn('w-2 h-2 bg-white rounded-full z-[1]', currentStep === 2 && 'bg-[#FCD666]')} />
            <li className={cn('w-2 h-2 bg-white rounded-full z-[1]', currentStep === 3 && 'bg-[#FCD666]')} />
          </ul>
        </Flex>
      </header>

      {currentStep === 1 && (
        <img src={Onboarding1} alt="Onboarding1" className="absolute inset-0 h-full w-full object-cover" />
      )}
      {currentStep === 2 && (
        <img src={Onboarding2} alt="Onboarding2" className="absolute inset-0 h-full w-full object-cover" />
      )}
      {currentStep === 3 && (
        <img src={Onboarding3} alt="Onboarding3" className="absolute inset-0 h-full w-full object-cover" />
      )}

      <Text typography="heading3" className="z-[1] text-white text-center relative whitespace-pre-line">
        {ONBOARDING_LIST[currentStep - 1]}
      </Text>

      <FixedBottom className="py-8">
        <Button size="xl" color="contrast" onClick={currentStep === 3 ? handleStart : handleNext} className="w-full">
          {currentStep === 3 ? '시작하기' : '다음'}
        </Button>
      </FixedBottom>
    </div>
  );
}
