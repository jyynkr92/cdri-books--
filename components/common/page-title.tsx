interface Props {
  children: React.ReactNode;
}

export const PageTitle = ({ children }: Props) => {
  return <h1 className="text-title-2 text-palette-black">{children}</h1>;
};
