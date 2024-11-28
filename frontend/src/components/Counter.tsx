import { FaMinus, FaPlus } from 'react-icons/fa';
import { Button } from './ui/button';

interface Props {
  quantity: number;
  handleAdd: () => void;
  handleSubtract: () => void;
  startValue?: number;
  maxValue?: number;
}

export const Counter = ({
  quantity,
  handleAdd,
  handleSubtract,
  startValue = 0,
  maxValue = 6,
}: Props) => {
  return (
    <>
      <Button
        type='button'
        disabled={quantity === startValue ? true : false}
        variant={'outline'}
        size={'icon'}
        className={`w-6 h-6 py-0 px-0  ${
          quantity === startValue && 'disabled:opacity-30'
        }`}
        onClick={handleSubtract}
      >
        <FaMinus size={'10px'} />
      </Button>
      <span>{quantity}</span>
      <Button
        type='button'
        disabled={quantity === maxValue ? true : false}
        variant={'outline'}
        size={'icon'}
        className={`w-6 h-6 py-0 px-0 ${
          quantity === maxValue && 'disabled:opacity-30'
        }`}
        onClick={handleAdd}
      >
        <FaPlus size={'10px'} />
      </Button>
    </>
  );
};
