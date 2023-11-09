import { ActionFunctionArgs } from '@remix-run/node';

import { items } from './shop.items';

export async function action({ request, params }: ActionFunctionArgs) {
  const id = parseInt(params.id as string);
  const formData = await request.formData();
  const operation = formData.get('operation') as string;
  const index = items.findIndex(item => item.id === id);
  if (index > -1) {
    if (operation === 'delete') {
      items.splice(index, 1);
    }
    if (operation === 'load') {
      items[index].inCart = true;
    }
    if (operation === 'unload') {
      items[index].inCart = false;
    }
  }

  return null;
}
