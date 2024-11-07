import { Label } from './label';
import { cn } from '@/lib/utils';

interface RadioGroupProps {
  value: string;
  id: string;
  name: string;
  className: string;
}

export const ButtonRadioGroup = ({
  value,
  id,
  name,
  className,
}: RadioGroupProps) => {
  return (
    <div className='relative isolate'>
      <input
        type='radio'
        name={name}
        value={value}
        id={id}
        className={
          'absolute left-8 top-2 -z-10 border border-primary peer opacity-0 ' +
          className
        }
      />
      <Label
        htmlFor={id}
        className='block w-20 py-2 cursor-pointer rounded-full peer-checked:bg-primary peer-checked:text-background capitalize border border-primary text-center'
      >
        {value}
      </Label>
    </div>
  );
};
