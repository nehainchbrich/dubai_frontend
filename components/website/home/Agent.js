// components/website/agent/Agent.jsx
import React from "react";
import AgentCard from "../common/AgentCard";
import Link from "next/link";

const Agent = ({ data, type, heading }) => {
  const filteredData = data.filter((item) => {
    if (type === "agent") {
      return item.is_agent === 1;
    } else {
      return item.is_agent === 1 || item.is_agent === 0;
    }
  });

  const limitedData = filteredData.slice(0, 12);

  return (
    <section className="our-team-section py-5">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-md-9">
            <div dangerouslySetInnerHTML={{ __html: heading }} />
          </div>
          {type === "team" && (
            <div className="col-md-3 text-end">
              <Link href="/agent-profile" className="btns btn-orange">
                View More →
              </Link>
            </div>
          )}
        </div>

        <div className="row">
          {limitedData.map((item, index) => (
            <div className="col-md-4 col-lg-3 col-6 mb-4" key={index}>
              <AgentCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agent;
