type Topic = {
  title: string;
  content: string;
  createdDate: string | Date;
  comments: number | string;
  views: number;
};

type TopicType = {
  index: number;
  cardIndexChoose: number;
  handleClick: () => void;
  cardData: Topic;
};
export default TopicType;
