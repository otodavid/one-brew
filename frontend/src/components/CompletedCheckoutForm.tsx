import { FormValues } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { set } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { groups } from '@/lib/constants';

interface Prop {
  formValues: FormValues | undefined;
  setIsFormFilled: Dispatch<SetStateAction<boolean>>;
}

export const CompletedCheckoutForm = ({
  formValues,
  setIsFormFilled,
}: Prop) => {
  return (
    <div>
      <Card>
        {Object.entries(groups).map(([key, groupLabel]) => (
          <div key={key}>
            <CardHeader>
              <CardTitle>{groupLabel}</CardTitle>
            </CardHeader>

            <CardContent>
              {formValues &&
                Object.entries(formValues)
                  .filter(([_, details]) => details.group === key)
                  .map(([_, details]) => (
                    <p key={details.value}>{details.value}</p>
                  ))}
            </CardContent>
          </div>
        ))}

        <CardFooter>
          <Button variant={'link'} onClick={() => setIsFormFilled(false)}>
            Edit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
