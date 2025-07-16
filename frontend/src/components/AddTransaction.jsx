"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import AddTransactionForm from "./AddTransactionForm"

import { useState } from "react"

const AddTransaction = ({ onAddTransaction }) => {
  const [type, setType] = useState("income")
  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-2xl mx-auto w-full rounded-md border border-zinc-200 bg-zinc-100 p-5">
        <h2 className="text-lg font-medium">Add Transaction</h2>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setType("income")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm ${
              type === "income" ? "bg-green-600 text-white" : "bg-green-100 text-green-600"
            }`}
          >
            <TrendingUp size={16} />
            Income
          </button>
          <button
            onClick={() => setType("expense")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm ${
              type === "expense" ? "bg-red-600 text-white" : "bg-red-100 text-red-600"
            }`}
          >
            <TrendingDown size={16} />
            Expense
          </button>
        </div>

        <AddTransactionForm onAddTransaction={onAddTransaction} type={type} />
      </div>
    </div>
  )
}

export default AddTransaction
