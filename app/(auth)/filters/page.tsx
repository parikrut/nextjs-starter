import { AsyncSelectFilter } from "@/components/filters/asyncSelect.filter";
import { CheckboxFilter } from "@/components/filters/checkbox.filter";
import { RadioFilter } from "@/components/filters/radio.filter";
import { SearchFilter } from "@/components/filters/search.filter";
import { SelectFilter } from "@/components/filters/select.filter";
import { UniversalForm } from "@/components/forms/universal.form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GetAllUsers } from "@/server/user.api";

export default function Page() {
    return <Card className="mx-auto min-w-96">
        <CardHeader>
            <CardTitle className="text-xl">All kinds of filter</CardTitle>
            <CardDescription>
                This is a page with all kinds of filters
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-4">
                {/* <SearchFilter
                    queryKey="search"
                    label="Search"
                    placeholder="Search"
                    options={[{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }]}
                /> */}
                <Separator />
                <CheckboxFilter
                    queryKey="checkbox"
                    label="Checkbox"
                />
                <Separator />
                <SelectFilter
                    queryKey="select"
                    label="Select"
                    placeholder="Select"
                    options={[{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }]}
                />
                <Separator />
                <RadioFilter
                    queryKey="radio"
                    options={[{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }, { label: "Option 3", value: "3" }]}
                />
                <Separator />
                <AsyncSelectFilter
                    label="Async Select"
                    option={{ label: "name", value: "id" }}
                    searchFunction={GetAllUsers}
                    queryKey="search"
                />
            </div>
        </CardContent>
    </Card>
}
