
import ActionMenu from '@/components/common/data-table/action-menu';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { type ColumnDef } from '@tanstack/react-table';
import { VoterDto } from '@voting-app/schemas';
import { ArrowUp } from 'lucide-react';

export const columns: ColumnDef<VoterDto>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First name
          <ArrowUp className={
            cn({
              'transition-transform duration-200 h-4 w-4': true,
              'transform rotate-180': column.getIsSorted() === 'desc',
            })
          } />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('firstName')}</div>,
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last name
          <ArrowUp className={
            cn({
              'transition-transform duration-200 h-4 w-4': true,
              'transform rotate-180': column.getIsSorted() === 'desc',
            })
          } />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('lastName')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUp className={
            cn({
              'transition-transform duration-200 h-4 w-4': true,
              'transform rotate-180': column.getIsSorted() === 'desc',
            })
          } />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'voterId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Voter ID
          <ArrowUp className={
            cn({
              'transition-transform duration-200 h-4 w-4': true,
              'transform rotate-180': column.getIsSorted() === 'desc',
            })
          } />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('voterId')}</div>,
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Gender
          <ArrowUp className={
            cn({
              'transition-transform duration-200 h-4 w-4': true,
              'transform rotate-180': column.getIsSorted() === 'desc',
            })
          } />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('gender')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Actions',
    cell: () => {
      // // eslint-disable-next-line react-hooks/rules-of-hooks
      // const { setMember, clearMember } = useMemberStore();
      // const utils = api.useUtils();
      // const { mutateAsync } = api.member.deleteMember.useMutation({
      //   onSuccess: async () => {
      //     await utils.member.getMembers.invalidate();
      //   },
      // });
      // const member = row.original;

      // const handleDelete = async () => {
      //   await mutateAsync({
      //     id: member.id,
      //   });
      // };

      // const handleEdit = async () => {
      //   await clearMember();
      //   setMember(member);
      // };

      return <ActionMenu handleDelete={() => { }} handleEdit={() => { }} />;
    },
  },
];
