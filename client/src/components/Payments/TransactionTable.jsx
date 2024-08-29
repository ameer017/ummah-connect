import React from "react";
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	flexRender,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

const TransactionsTable = ({ transactions }) => {
	const [sorting, setSorting] = React.useState([
		{ id: "createdAt", desc: true },
	]);
	const [filtering, setFiltering] = React.useState("");

	const columns = React.useMemo(
		() => [
			{
				header: "Type",
				accessorKey: "type",
				cell: ({ row }) => {
					switch (row.original.type) {
						case "balanceTransfer":
							return "Earning";
						case "payout":
							return "Withdrawal";
						default:
							return row.original.type;
					}
				},
				filterFn: (row, id, filterValue) => {
					if (filterValue === "") return true;
					return row.original.type === filterValue;
				},
			},
			{
				header: "Amount",
				accessorKey: "amount",
				cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
			},
			{
				header: "Status",
				accessorKey: "status",
				cell: ({ row }) => row.original.status.toUpperCase(),
			},
			{
				header: "Course",
				accessorKey: "courseId",
				cell: ({ row }) => row.original.courseId?.title || "N/A",
			},
			{
				header: "Stripe Transaction ID",
				accessorKey: "stripeTransactionId",
			},
			{
				header: "Date",
				accessorKey: "createdAt",
				cell: ({ row }) =>
					new Date(row.original.createdAt).toLocaleDateString(),
				sortingFn: "datetime",
			},
		],
		[]
	);

	const table = useReactTable({
		data: transactions,
		columns,
		state: {
			sorting,
			globalFilter: filtering,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setFiltering,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		initialState: { pagination: { pageSize: 10 } },
	});

	return (
		<div className="" >
			<div className="flex justify-between items-center">
				<Select
					onValueChange={(value) =>
						table
							.getColumn("type")
							?.setFilterValue(value === "all" ? "" : value)
					}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Transaction Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Types</SelectItem>
						<SelectItem value="balanceTransfer">Earnings</SelectItem>
						<SelectItem value="payout">Withdrawals</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder ? null : (
										<div
											{...{
												className: header.column.getCanSort()
													? "cursor-pointer select-none"
													: "",
												onClick: header.column.getToggleSortingHandler(),
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{{
												asc: " 🔼",
												desc: " 🔽",
											}[header.column.getIsSorted()] ?? null}
										</div>
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>

			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						{"<<"}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						{">>"}
					</Button>
				</div>
				<span className="flex items-center gap-1">
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</strong>
				</span>
				<Select
					value={table.getState().pagination.pageSize}
					onValueChange={(value) => {
						table.setPageSize(Number(value));
						console.log(table.getState().pagination.pageSize);
					}}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Transaction Type" />
					</SelectTrigger>
					<SelectContent>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<SelectItem key={pageSize} value={pageSize}>
								Show {pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default TransactionsTable;
