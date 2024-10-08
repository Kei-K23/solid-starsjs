import { createSignal, Show, Index } from "solid-js";
import RatingContainer from "./rating-container";
import Star from "./rate";

interface RatingProps {
  maxRating?: number;
  initialRating?: number;
  size?: number;
  color?: string;
  activeColor?: string;
  halfFillMode?: boolean;
  readOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: (rating: number) => void;
  onClick?: (rating: number) => void;
}

export default function Rating(props: RatingProps) {
  const [hoverRating, setHoverRating] = createSignal(props.initialRating || 0);

  const handleMouseMove = (index: number, event: MouseEvent) => {
    if (props.readOnly) return;

    const starWidth = (event.currentTarget as HTMLElement).offsetWidth;

    const mouseX =
      event.clientX -
      (event.currentTarget as HTMLElement).getBoundingClientRect().left;

    const halfStarWidth = starWidth / 2;

    if (props.halfFillMode) {
      setHoverRating(mouseX < halfStarWidth ? index + 0.5 : index + 1);
    } else {
      setHoverRating(index + 1);
    }
    // When isRequired true, rating item should be have one at least, If not just reset by passing -1 to hoverRating signal
    if (!props.isRequired) {
      if (mouseX < 5) {
        setHoverRating(-1);
      }
    }

    props.onChange?.(hoverRating());
  };

  const handleMouseLeave = () => {
    if (props.readOnly) return;
  };

  const handleOnClick = () => {
    if (props.readOnly) return;
    props.onClick?.(hoverRating());
  };

  return (
    <RatingContainer>
      <Index each={Array(props.maxRating || 5).fill(0)}>
        {(_, index) => {
          return (
            <Star
              index={index}
              isDisabled={props.isDisabled}
              halfFillMode={props.halfFillMode}
              size={props.size}
              color={props.color}
              activeColor={props.activeColor}
              readOnly={props.readOnly}
              hoverRating={hoverRating}
              onMouseMove={(event) => handleMouseMove(index, event)}
              onMouseLeave={handleMouseLeave}
              onClick={handleOnClick}
            />
          );
        }}
      </Index>
    </RatingContainer>
  );
}
