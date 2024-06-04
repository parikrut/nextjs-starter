"use client";
import { FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { Button, buttonVariants } from "@/components/ui/button";

interface PaginationProps {
    pageCount: number;
}

interface PaginationArrowProps {
    direction: "left" | "right";
    href: string;
    isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
    direction,
    href,
    isDisabled,
}) => {
    const router = useRouter();
    const isLeft = direction === "left";
    const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";

    return (
        <Button
            onClick={() => router.push(href)}
            className={`bg-gray-100 text-gray-500 hover:bg-gray-200 ${disabledClassName}`}
            aria-disabled={isDisabled}
            disabled={isDisabled}
        >
            {isLeft ? "«" : "»"}
        </Button>
    );
};

export function Paging({ pageCount }: Readonly<PaginationProps>) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <Pagination>
            <PaginationContent>
                {currentPage <= 1 ?
                    <></> :
                    <PaginationItem>
                        <PaginationPrevious
                            href={createPageURL(currentPage - 1)}
                        />
                    </PaginationItem>}
                <PaginationItem>
                    <span className={buttonVariants({
                        variant: "ghost",
                    })} >
                        Page {currentPage} of {pageCount}
                    </span>
                </PaginationItem>
                {currentPage >= pageCount ?
                    <></> :
                    <PaginationItem>
                        <PaginationNext
                            href={createPageURL(currentPage + 1)}
                        />
                    </PaginationItem>}
            </PaginationContent>
        </Pagination>
    );
}