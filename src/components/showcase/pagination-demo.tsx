"use client"

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationPrev,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

export function PaginationDemo() {
  const [page, setPage] = useState(3)
  const totalPages = 10

  return (
    <div className="flex flex-col gap-8">

      {/* Paginazione interattiva */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500 uppercase tracking-wider">
          Interattiva — pagina corrente: <span className="font-semibold text-[var(--brand-navy)]">{page}</span> di {totalPages}
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrev onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
            </PaginationItem>

            {/* Prima pagina sempre visibile */}
            <PaginationItem>
              <PaginationButton isActive={page === 1} onClick={() => setPage(1)}>1</PaginationButton>
            </PaginationItem>

            {/* Ellipsis sinistra */}
            {page > 3 && (
              <PaginationItem><PaginationEllipsis /></PaginationItem>
            )}

            {/* Pagine centrali */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p !== 1 && p !== totalPages && Math.abs(p - page) <= 1)
              .map((p) => (
                <PaginationItem key={p}>
                  <PaginationButton isActive={p === page} onClick={() => setPage(p)}>
                    {p}
                  </PaginationButton>
                </PaginationItem>
              ))}

            {/* Ellipsis destra */}
            {page < totalPages - 2 && (
              <PaginationItem><PaginationEllipsis /></PaginationItem>
            )}

            {/* Ultima pagina sempre visibile */}
            <PaginationItem>
              <PaginationButton isActive={page === totalPages} onClick={() => setPage(totalPages)}>
                {totalPages}
              </PaginationButton>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Paginazione semplice (solo prev/next) */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Semplice — solo prev / next</p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrev disabled />
            </PaginationItem>
            <PaginationItem>
              <span className="px-3 text-sm text-gray-500">Pagina 1 di 5</span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

    </div>
  )
}
