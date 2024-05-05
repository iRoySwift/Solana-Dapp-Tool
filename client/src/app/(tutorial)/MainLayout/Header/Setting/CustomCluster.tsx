import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import LinkButton from './LinkButton';
import { iCluster } from '@/store/solana';
import { Input } from '@/components/ui/input';
import { UnplugIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const FormSchema = z.object({
  url: z.string().url('url 格式不正确').min(2),
});

interface Props {
  clusterUrl: string;
  handleClick: (v: iCluster) => void;
}
const CustomCluster: React.FC<Props> = (props) => {
  const { clusterUrl, handleClick } = props;
  const [clusterUrlList, setClusterUrlList] = useState<string[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setClusterUrlList((preClusterUrl) => [...preClusterUrl, data.url]);
    handleClick(data.url);
    form.setValue('url', '');
  };
  return (
    <>
      {clusterUrlList.map((item, i) => (
        <LinkButton
          key={i}
          currentCluster={clusterUrl}
          cluster={item}
          handleClick={handleClick}
        >
          {item}
        </LinkButton>
      ))}
      <Form {...form}>
        <form className="relative" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    className=""
                    placeholder="请输入URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="absolute right-2 top-2 cursor-pointer rounded-md bg-primary p-1"
          >
            <UnplugIcon className="h-4 w-4 text-primary-foreground" />
          </button>
        </form>
      </Form>
    </>
  );
};
export default CustomCluster;
