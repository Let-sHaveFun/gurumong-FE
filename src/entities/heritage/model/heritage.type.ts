// GYU-TODO: 해당 타입을 model 로 빼는게 나을지? 아니면 api 에서 하는게 나을지 고민중
// 확장성을 고려하면 model 로 빼는게 나을 것 같음, 응집도를 고려하면 api 내에서 하는게 나을거 같음.
export type Heritage = {
  imgPath: string;
  audioUrl: string;
  script: string;
  name: string;
  external_id: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  category: string;
  tag: string;
  introduction: string;
  distance: number;
};
