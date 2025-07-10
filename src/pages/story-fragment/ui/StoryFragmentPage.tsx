import { Badge, Box, Flex, Text } from '@vapor-ui/core';
import { ExamIcon } from '@vapor-ui/icons';
import { useDormungStore } from '@/shared/store';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn, typography } from '@/shared/style';

export const StoryFragmentPage = () => {
  const navigate = useNavigate();
  const { badges } = useDormungStore();

  const count = useMemo(() => badges.length, [badges]);

  const restEmptyBadges = 15 - count;
  return (
    <Box className="bg-[#558CF5] min-h-screen px-4 pb-10">
      <Flex gap="$100" flexDirection="column" padding="$000" className="flex">
        <header className="py-3 ">
          <Flex gap="$100" flexDirection="column" className="mt-8">
            <ExamIcon width={32} height={32} className="text-white" />
            <Text typography="heading3" className={cn(typography.heading3, 'w-full text-white whitespace-pre-line')}>
              {'제주의 이야기조각을\n'} <span className="text-[#BCE57D]">{count}</span>개 모았어요
            </Text>
          </Flex>
        </header>
      </Flex>

      <Flex gap="$100" className="mt-8 flex-wrap flex gap-2 justify-center mb-[100px] " justifyContent="center">
        {badges.map((badge, idx) => {
          return (
            <Flex
              key={`${badge.id}-${idx}`}
              flexDirection="column"
              gap="$100"
              alignContent="center"
              justifyContent="center"
              className="w-[30%] h-[116px] bg-[#FEF8E5] flex flex-col gap-1 justify-center rounded-lg"
              onClick={() => {
                navigate(`/place/${badge.id}`);
              }}
            >
              <img src={badge.image} alt={`${badge.name} 이미지`} className="w-full h-[50px]" />
              <Badge color="hint" size="sm" shape="pill" className="bg-white w-full">
                <span className="text-center w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                  {badge.name}
                </span>
              </Badge>
            </Flex>
          );
        })}

        {Array.from({ length: restEmptyBadges }).map((_, idx) => {
          return (
            <Flex
              key={`empty-${idx}`}
              flexDirection="column"
              gap="$100"
              alignContent="center"
              justifyContent="center"
              className="w-[30%] h-[116px] bg-[#FEF8E5] flex flex-col gap-1 justify-center rounded-lg"
            >
              <div className="w-full h-[50px]"></div>

              <Badge color="hint" size="sm" shape="pill" className="bg-white w-full">
                <span className="text-center w-full">???</span>
              </Badge>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};
