import { TicketType } from "@/app/types";

async function getTicket(id: string): Promise<TicketType> {
  const resp = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

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
