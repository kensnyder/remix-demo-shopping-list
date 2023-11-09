import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

export const items = [
  {
    id: +new Date(),
    name: 'Bread',
    inCart: false,
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ items });
}

export default function Items() {
  const { items } = useLoaderData<typeof loader>();
  return (
    <main>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span style={{ textDecoration: item.inCart ? 'line-through' : '' }}>
              {item.name}
            </span>
            <Form
              method="POST"
              action={`/shop/items/${item.id}`}
              style={{ display: 'inline' }}
            >
              <button name="operation" value="delete">
                Delete
              </button>
              <button name="operation" value="load">
                Load in cart
              </button>
              <button name="operation" value="unload">
                Unload from cart
              </button>
            </Form>
          </li>
        ))}
      </ul>
      <Form method="POST" key={items.length}>
        <input name="name" autoFocus />
        <button>Add item</button>
      </Form>
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  items.push({
    id: +new Date(),
    name,
    inCart: false,
  });
  return null;
}
