import React from 'react';
import { Button, Form, Loader, SimpleFormInput, ToastAction, useToast } from '@/shared/ui';
import { WalkerSkeleton } from '@/widgets/walker/walker-card/ui/WalkerSkeleton.tsx';
import { SheetClose, SimpleFormSheet } from '@/shared/ui/sheet.tsx';
import { z } from 'zod';
import { WalkerSchema } from '@/features/create-walker/models/models.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetWalker, useUpdateWalker } from '@/shared/hooks';

type WalkerCardProps = {
  walkerId: string;
};

export const WalkerCard: React.FC<WalkerCardProps> = ({ walkerId }) => {
  const { data: walkerResponse, isPending: isWalkerLoading } = useGetWalker({ id: walkerId });
  const { toast } = useToast();
  const { mutateAsync: updateWalker, isPending: isLoadingCreate } = useUpdateWalker(walkerId);

  const walkerForm = useForm<z.infer<typeof WalkerSchema>>({
    resolver: zodResolver(WalkerSchema),
    defaultValues: {
      id: '',
      skills: '',
      about: '',
    },
  });

  if (isWalkerLoading || !walkerResponse) {
    return <WalkerSkeleton />;
  }

  if (walkerResponse.isFailure) {
    toast({
      title: 'Cant find walker',
      description: 'there is no walker with this id',
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
    return <WalkerSkeleton />;
  }

  const walker = walkerResponse.data;

  const handleSubmit = async (value: z.infer<typeof WalkerSchema>) => {
    value.id = walkerId;
    await updateWalker(value);
  };

  return (
    <div className={'flex flex-col justify-between gap-2 sm:flex-row'}>
      <div className={'flex w-full flex-col gap-1'}>
        <div className={'font-semibold'}>Walker Info</div>
        <div className={'flex gap-2'}>Skills: {walker.skills}</div>
        <div className={'flex gap-2'}>About: {walker.about}</div>
      </div>
      <SimpleFormSheet
        triggerText={'Edit'}
        tittle={'Edit walker information'}
        description={"Make changes to your profile here. Click save when you're done."}>
        <Form {...walkerForm}>
          <form
            onSubmit={walkerForm.handleSubmit(handleSubmit)}
            className="flex w-full max-w-5xl flex-col gap-1">
            <SimpleFormInput
              fieldLabel={'Skills:'}
              fieldName={'skills'}
              inputType={''}
              textArea={true}
            />
            <SimpleFormInput
              fieldLabel={'About'}
              fieldName={'about'}
              inputType={''}
              textArea={true}
            />
            <SheetClose>
              <Button className={'mt-2 w-full'} type={'submit'}>
                {isLoadingCreate ? <Loader /> : 'Save Changes'}
              </Button>
            </SheetClose>
          </form>
        </Form>
      </SimpleFormSheet>
    </div>
  );
};
