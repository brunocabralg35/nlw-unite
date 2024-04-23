import { IoIosMore } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import TableRow from "./table/table-row";
import { useState } from "react";
import { attendees } from "../data/attendees";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export default function AttendeeList() {
  const [search, setSearch] = useState<string>();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(attendees.length / 10)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="font-bold text-2xl">Participantes</h1>
        <div className="px-3 py-1.5 border w-72 border-white/10 rounded-lg text-sm flex items-center gap-3">
          <IoSearch className="size-4 text-emerald-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Buscar participantes"
            className="bg-transparent flex-1 outline-none p-0 border-0 ring-0 text-small"
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                className="size-4 bg-black/20 rounded border border-white/10"
                type="checkbox"
                name=""
                id=""
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
            return (
              <TableRow key={attendee.id}>
                <TableCell>
                  <input
                    className="size-4 bg-black/20 rounded border border-white/10"
                    type="checkbox"
                    name=""
                    id=""
                  />
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  {attendee.id}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  {dayjs().to(attendee.createdAt)}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  {dayjs().to(attendee.checkedInAt)}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300">
                  <IconButton transparent>
                    <IoIosMore className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell className="py-3 px-4 text-sm text-zinc-300" colSpan={3}>
              Mostrando 10 de {attendees.length} itens
            </TableCell>
            <TableCell
              className="py-3 px-4 text-sm text-zinc-300 text-right"
              colSpan={3}
            >
              <div className="inline-flex items-center gap-8">
                <span>
                  {" "}
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={() => setPage(1)} disabled={page === 1}>
                    <MdKeyboardDoubleArrowLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
                    <MdKeyboardArrowLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    <MdKeyboardArrowRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={() => setPage(totalPages)} disabled={page === totalPages}
                  >
                    <MdKeyboardDoubleArrowRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
