import { Box, Button, Dialog } from '@vapor-ui/core';
import { useState } from 'react';
import { DrawerTest } from './DrawerTest';
import { KakaoMap } from '@/shared/ui';

export function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <Box className="h-screen">
      <h1 className="text-2xl font-bold">Home</h1>
      <Button onClick={() => setCount(count + 1)}>Click me {count}</Button>

      <div className="flex gap-2">
        <span className="text-blue-500">tailwind style test</span>
        <div className="bg-red-500 w-10 h-10" />
      </div>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Vapor UI 클릭</Button>
        </Dialog.Trigger>
        <Dialog.CombinedContent>
          <Dialog.Header>
            <Dialog.Title>알림</Dialog.Title>
            <Dialog.Close aria-label="Close" />
          </Dialog.Header>
          <Dialog.Body>
            <Dialog.Description>여기에 다이얼로그 본문 내용이 들어갑니다.</Dialog.Description>
          </Dialog.Body>
          <Dialog.Footer style={{ marginLeft: 'auto' }}>
            <button style={{ padding: '0.5rem 1rem' }}>확인</button>
          </Dialog.Footer>
        </Dialog.CombinedContent>
      </Dialog.Root>
      <DrawerTest />
      <KakaoMap />
    </Box>
  );
}
