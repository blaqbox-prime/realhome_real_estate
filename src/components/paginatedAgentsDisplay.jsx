/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import AgentCard from "./AgentCard"
import Pagination from "./Pagination"

function PaginatedAgentsDisplay({ agents = [] }) {
  return (
    <section className="my-4" aria-labelledby="featured-agents-heading" >
      <div className="my-1 text-left">
        <div className="">
            <h1 id="featured-agents-heading" className="mb-1 text-3xl font-semibold flex gap-2 items-center">
        All Certified <span className="text-gray-400">Practitioners</span>
      </h1>
      <p className="text-gray-400 italic">
        Showing active partner representatives
      </p>
        </div>
      </div>

    <Pagination
      items={agents}
      itemsPerPage={16}
      listClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-4"
      ariaLabel="Agent pages"
      renderItem={(agent) => (
        <Link to={`/agents/${agent.id}`}>
          <AgentCard agent={agent} />
        </Link>
      )}
      itemKey={(agent) => agent.id}
    />

    </section>
  )
}

export default PaginatedAgentsDisplay