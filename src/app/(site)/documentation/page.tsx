
import { Configuration } from "@/components/documentation/Configuration";
import { DocNavigation } from "@/components/documentation/DocNavigation";
import { Introduction } from "@/components/documentation/Introduction";
import { PackageStructure } from "@/components/documentation/PackageStructure";
import { QuickStart } from "@/components/documentation/QuickStart";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Documentation | Property-pro",
};

export const revalidate = 3600;

export default function Page() {
    return (
        <div className="dark:bg-darkmode" >
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md p-6 pt-24 lg:mt-0 mt-16 ">
                <div className="grid grid-cols-12 gap-6">
                    <div className="lg:col-span-3 col-span-12 lg:block hidden">
                        <DocNavigation />
                    </div>
                    <div className="lg:col-span-9 col-span-12">
                        <Introduction />
                        <PackageStructure />
                        <QuickStart />
                        <Configuration />
                    </div>
                </div>
            </div>
        </div>
    );
};
