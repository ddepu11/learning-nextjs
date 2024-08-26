import React from "react";
import { TicketType } from "../types";
import Link from "next/link";

async function getTickets(): Promise<TicketType[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const resp = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0, // 0 to opt out cache
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
            <Link href={`/tickets/${id}`}>
              <h3>{title}</h3>
              <p>{body.slice(0, 200)}</p>
              <div className={`pill ${priority}`}>{priority} priority</div>
            </Link>
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
