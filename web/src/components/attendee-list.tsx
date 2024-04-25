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

import { useEffect, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export default function AttendeeList() {
  const [search, setSearch] = useState<string>(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / 10);

  const setCurrentPage = (page: number) => {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  };

  const setCurrentSearch = (search: string) => {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);

    setSearch(search);
  };

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/22ef5b56-0ee0-4729-aeab-e906c3dcceb5/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="font-bold text-2xl">Participantes</h1>
        <div className="px-3 py-1.5 border w-72 border-white/10 rounded-lg text-sm flex items-center gap-3">
          <IoSearch className="size-4 text-emerald-300" />
          <input
            value={search}
            onChange={(e) => {
              setCurrentSearch(e.target.value);
              setPage(1);
            }}
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
          {attendees.map((attendee) => {
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
                  {!attendee.checkedInAt ? (
                    <span className="text-zinc-400">Não fez check-in</span>
                  ) : (
                    dayjs().to(attendee.checkedInAt)
                  )}
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
              Mostrando {attendees.length} de {total} itens
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
                  <IconButton
                    onClick={() => setCurrentPage(1)}
                    disabled={page === 1}
                  >
                    <MdKeyboardDoubleArrowLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={() => setCurrentPage(page - 1)}
                    disabled={page === 1}
                  >
                    <MdKeyboardArrowLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={() => setCurrentPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    <MdKeyboardArrowRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={page === totalPages}
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
