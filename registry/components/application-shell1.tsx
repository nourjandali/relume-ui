"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown, RxChevronRight, RxCross2 } from "react-icons/rx";
import { BiBell, BiSearch } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/use-media-query";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
};

export type ApplicationShell1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const ApplicationShell1 = (props: ApplicationShell1Props) => {
  const { logo, navLinks } = {
    ...ApplicationShell1Defaults,
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchIconClicked, setIsSearchIconClicked] =
    useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 991px)");
  useEffect(() => {
    if (!isSearchIconClicked) {
      return;
    }
    const handleClickOutside = (event: PointerEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsSearchIconClicked(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isSearchIconClicked]);

  useEffect(() => {
    if (!menuRef) {
      return;
    }
    const handleClickOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isSearchIconClicked]);

  return (
    <section id="relume">
      <div className="sticky top-0 z-40 flex w-full flex-wrap items-center justify-between border-b border-scheme-1-border bg-scheme-1-background px-6 lg:px-8">
        <div className="flex min-h-16 items-center md:min-h-18">
          <button
            className="mr-4 -ml-4 flex size-12 flex-col items-center justify-center lg:hidden"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsSearchIconClicked(false);
            }}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-neutral-darkest"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-neutral-darkest"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-neutral-darkest"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
            />
          </button>
          <a href={logo.url}>
            <img src={logo.src} alt={logo.alt} />
          </a>
        </div>
        <div className="ml-auto flex flex-row items-center gap-4 lg:order-last">
          <div className="hidden w-full max-w-md lg:block">
            <Input
              className="w-full"
              placeholder="Search"
              icon={<BiSearch className="size-6" />}
            />
          </div>
          <div className="flex shrink-0 items-center gap-2 md:gap-4">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchIconClicked(!isSearchIconClicked);
              }}
              className="p-2 lg:hidden"
            >
              <BiSearch className="size-6" />
            </button>
            <AnimatePresence>
              {isSearchIconClicked && (
                <motion.div
                  ref={searchBarRef}
                  variants={{
                    visible: { opacity: 1 },
                    hidden: { opacity: 0 },
                  }}
                  initial="hidden"
                  exit="hidden"
                  animate={isSearchIconClicked ? "visible" : "hidden"}
                  className="absolute top-16 right-0 bottom-0 left-0 mt-px flex h-16 max-w-md items-center justify-center border-b border-scheme-1-border bg-white px-6 lg:hidden"
                >
                  <Input
                    className="h-fit w-full"
                    placeholder="Search"
                    icon={<BiSearch className="size-6" />}
                  />
                  <button
                    onClick={() => setIsSearchIconClicked(!isSearchIconClicked)}
                  >
                    <RxCross2 className="ml-4 size-6" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <DropdownMenu>
              <DropdownMenuTrigger className="relative">
                <div className="absolute top-2 right-2 bottom-auto left-auto size-2 rounded-full bg-neutral-darkest outline-[3px] outline-offset-0 outline-white" />
                <BiBell className="size-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="max-w-[19rem] px-0"
                align="end"
                sideOffset={0}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2">
                    <DropdownMenuLabel className="p-0">
                      Notifications
                    </DropdownMenuLabel>
                    <a href="#">Mark as read</a>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="h-full max-h-[14rem] overflow-auto px-2 py-1">
                    <DropdownMenuItem className="mt-2 grid grid-cols-[max-content_1fr] gap-2 px-2 py-1">
                      <div className="flex size-full flex-col items-start justify-start">
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                          alt="Avatar"
                          className="size-6"
                        />
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                        <p className="mt-2 text-sm">11 Jan 2022</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="mt-2 grid grid-cols-[max-content_1fr] gap-2 px-2 py-1">
                      <div className="flex size-full flex-col items-start justify-start">
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                          alt="Avatar"
                          className="size-6"
                        />
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                        <p className="mt-2 text-sm">11 Jan 2022</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="flex w-full items-end justify-end px-4 py-2">
                  <Button
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    asChild
                  >
                    <a href="#">View All</a>
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center p-0">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Avatar"
                  className="size-10 rounded-full object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={0}
                className="mt-1.5 min-w-32 px-0 py-2 md:min-w-48"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <a href="#">My Profile</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#">Profile Settings</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="mx-4" />
                  <DropdownMenuItem>
                    <a href="#">Log Out</a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <motion.div
          ref={menuRef}
          variants={{
            open: {
              height: "var(--height-open, auto)",
            },
            close: {
              height: "var(--height-closed, 0)",
            },
          }}
          initial="close"
          exit="close"
          animate={isMobileMenuOpen ? "open" : "close"}
          transition={{ duration: 0.4 }}
          className="w-full overflow-hidden lg:order-2 lg:ml-6 lg:w-auto lg:grow lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          <div className="pt-4 pb-8 lg:flex lg:items-center lg:py-0">
            {navLinks.map((navLink, index) =>
              navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                <SubMenu key={index} navLink={navLink} isMobile={isMobile} />
              ) : (
                <a
                  key={index}
                  href={navLink.url}
                  className="block py-3 lg:px-4 lg:py-2"
                >
                  {navLink.title}
                </a>
              )
            )}
          </div>
        </motion.div>
      </div>
      <main className="flex-1 bg-scheme-1-foreground">
        <div className="border-b-2 border-dashed border-[#d3d3d3] py-6 text-center text-neutral-darkest/50">
          <h1>Click and paste Page Header</h1>
        </div>
        <div className="container px-6 py-8 md:px-8 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 gap-12">
            <div className="flex h-screen items-center justify-center border-2 border-dashed border-[#d3d3d3] py-6 text-center text-neutral-darkest/50">
              <h2>Click and paste Main Content</h2>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

const SubMenu = ({
  navLink,
  isMobile,
}: {
  navLink: NavLink;
  isMobile: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="flex w-full items-center justify-between gap-2 py-3 text-left lg:flex-none lg:justify-start lg:px-4 lg:py-2"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{navLink.title}</span>
        <motion.span
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          animate={isDropdownOpen ? "rotated" : "initial"}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown />
        </motion.span>
      </button>
      {isDropdownOpen && (
        <AnimatePresence>
          <motion.nav
            variants={{
              open: {
                visibility: "visible",
                opacity: "var(--opacity-open, 100%)",
                y: 0,
              },
              close: {
                visibility: "hidden",
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
              },
            }}
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className="bg-scheme-1-background lg:absolute lg:z-50 lg:border lg:border-scheme-1-border lg:p-2 lg:[--y-close:25%]"
          >
            {navLink.subMenuLinks?.map((navLink, index) => (
              <a key={index} href={navLink.url} className="block px-4 py-2">
                {navLink.title}
              </a>
            ))}
          </motion.nav>
        </AnimatePresence>
      )}
    </div>
  );
};

export const ApplicationShell1Defaults: Props = {
  logo: {
    url: "#",
    src: "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg",
    alt: "Logo image",
  },
  navLinks: [
    { title: "Link One", url: "#" },
    { title: "Link Two", url: "#" },
    { title: "Link Three", url: "#" },
    {
      title: "Link Four",
      url: "#",
      subMenuLinks: [
        { title: "Link Five", url: "#" },
        { title: "Link Six", url: "#" },
        { title: "Link Seven", url: "#" },
      ],
    },
  ],
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

ApplicationShell1.displayName = "ApplicationShell1";
