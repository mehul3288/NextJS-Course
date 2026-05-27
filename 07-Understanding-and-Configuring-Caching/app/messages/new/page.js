import { redirect } from 'next/navigation';

import { addMessage } from '@/lib/messages';
import { revalidatePath, revalidateTag } from 'next/cache';

export default function NewMessagePage() {
  async function createMessage(formData) {
    'use server';

    const message = formData.get('message');
    addMessage(message);
    //this will revalidate only the page which is under messages folder and not is nested routes like message/blog(this will not be revalidated) to revalidate the nested paths as well we could use revalidatePath("/messages","layout") now this will revalidate /messages and all its nested pages by default is revalidatePath("/messages","page") to revalidate root wise use revalidatePath("/","layout") you can call revalidatePath multiple times to revalidate multiple paths revalidatePath("/messages");revalidatePath("/something")
    // revalidatePath("/messages");
    

    //So you can set tags to any request sent via fetch like this fetch("http://localhost:8080/messages",{next:{tags:["msg"]}) so this tags will under the hood be connected to the cached data and then if you call revalidateTag next js revalidate and will throw away the existing cache for that particular tag so this will allow you to clear the cache data of multiple pages if those pages would assign the same tag to their request so instead of using revalidatePath("") for different pages you can assign tags to multiple request on those pages and could use revalidateTag to revalidate mutliple pages at once
    revalidateTag("msg");
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows="5" />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
