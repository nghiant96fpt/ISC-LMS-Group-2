const TopicCard = ({ topic, index, handleClick, cartIndexChoose }) => {
  return (
    <div onClick={handleClick} className={`p-4 ${index === cartIndexChoose ? 'bg-gray-100' : ''} rounded-lg`}>
      <h3 className="font-bold text-lg text-gray-800">{topic.title}</h3>
      <p className="text-gray-600 text-sm">{topic.content}</p>
      <div className="flex justify-between items-center mt-2 text-gray-500 text-sm">
        <span>👁 {topic.view}</span>
        <span>💬 {topic.comment}</span>
        <span>{topic.createdDate}</span>
      </div>
    </div>
  );
};
export default TopicCard;
