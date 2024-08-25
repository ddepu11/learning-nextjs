import React from "react";

type TicketType = {
  id: string;
  user_email: string;
  body: string;
  priority: string;
  title: string;
};

async function getTickets(): Promise<TicketType[]> {
  const resp = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0,
    },
  });

  return resp.json();
}

const TicketList = async () => {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map(({ body, id, priority, title, user_email }) => {
        return (
          <div key={id} className="card my-5">
            <h3>{title}</h3>
            <p>{body.slice(0, 200)}</p>
            <div className={`pill ${priority}`}>{priority} priority</div>
          </div>
        );
      })}
      {tickets.length === 0 ? (
        <p className="text-center">There are no open ticket</p>
      ) : null}
    </>
  );
};

export default TicketList;
