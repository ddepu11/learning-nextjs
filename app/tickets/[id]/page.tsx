import { TicketType } from "@/app/types";
import { notFound } from "next/navigation";

// Set it false when the ticket you have requested is not statically rendered
// and you want  to show 404 page
// true is default value: when you dont have page created and you want to
// actually create it then set it to true
export const dynamicParams = true;

// To statically rendered and served through CDN
// generateStaticParams
// Next js now can make corresponding route for each one of them in build time(ahead of time).
// This makes performance of the website much better. as they are statically served
// when revalidate is 0 no need to do this
export async function generateStaticParams() {
  const resp = await fetch("http://localhost:4000/tickets");

  const tickets: Promise<TicketType[]> = await resp.json();

  return (await tickets).map(({ id }) => id);
}

async function getTicket(id: string): Promise<TicketType> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const resp = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!resp.ok) {
    notFound();
  }

  return resp.json();
}

const TicketDetails = async ({ params }) => {
  const { id } = params;

  const {
    body,
    id: ticketId,
    priority,
    title,
    user_email,
  } = await getTicket(id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>

      <div className="card">
        <h3>{title}</h3>
        <small>Created By: {user_email}</small>

        <p>{body}</p>
        <div className={`pill ${priority}`}>{priority} priority</div>
      </div>
    </main>
  );
};

export default TicketDetails;
