import DynamicAccordion from "../../../../components/DynamicAccordion";
import { IconChevronBigRightOrange, IconChevronBigRightWhite } from "../../../../components/Icons";
import { data } from "./data";
import CourseList from "./CourseList";
// import { f } from "react-router/dist/development/fog-of-war-Cm1iXIp7";

const AllCourses = () => {
    return (
        <section>
            <DynamicAccordion
                items={data}
                getId={(item) => item.semester}
                multiple={false}
                renderHeader={(item, isOpen) => (
                    <>
                        {isOpen ? (
                            <IconChevronBigRightWhite className="text-xs md:text-sm lg:text-base text-white" />
                        ) : (
                            <IconChevronBigRightOrange className="text-xs md:text-sm lg:text-base text-orange-text" />
                        )}
                        <span className="font-semibold text-start text-xs md:text-sm lg:text-base">{item.semester}</span>
                    </>
                )}
                renderContent={(item) => <CourseList subjects={item.subjects || []} />}
            />
        </section>
    );
};

export default AllCourses;
