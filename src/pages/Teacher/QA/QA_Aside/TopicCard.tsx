import TopicType from './TopicType';

const TopicCard: React.FC<TopicType> = ({ handleClick, cardData, cardIndexChoose, index }) => {
  return (
    <div className="p-4 rounded-lg border">
      <h3 className="font-bold text-lg">{cardData.title}</h3>
      <p className="text-sm text-gray-600">{Array.isArray(cardData.content) ? cardData.content.join(', ') : cardData.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>👁 {cardData.views}</span>
        <span>💬 {cardData.comments}</span>
        <span>{cardData.createdDate instanceof Date ? cardData.createdDate.toLocaleDateString() : cardData.createdDate}</span>
      </div>
    </div>
  );
};

export default TopicCard;
