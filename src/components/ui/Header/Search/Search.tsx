import { Autocomplete, Box, TextField } from '@mui/material'
import {
  autocompleteStyles,
  clearIndicatorStyles,
  getListboxStyles,
  getPaperStyles,
  highlightedTextStyles,
  noResultsOptionStyles,
  popupIndicatorStyles,
  searchContainerStyles,
  textFieldStyles,
} from './searchStyles'
import {
  formatOptionLabel,
  highlightText,
  isNoResultsOption,
  type HighlightPart,
} from './searchUtils'
import { useSearch, type SearchOption } from './useSearch'

interface SearchProps {
  onOverlayChange?: (show: boolean) => void
  marginTop?: string
  paperHeight?: string
  overflow?: string
  width?: string
  onSelectProduct?: (productId: string) => void
  className?: string
}

export default function Search({
  onOverlayChange,
  overflow,
  marginTop,
  width,
  paperHeight,
  onSelectProduct,
  className,
}: SearchProps = {}) {
  const {
    inputValue,
    open,
    isLoading,
    hasInput,
    filteredOptions,
    handleChange,
    handleInputChange,
    handleOpen,
    handleClose,
  } = useSearch({ onOverlayChange, onSelectProduct })

  const renderOption = (props: any, option: SearchOption) => {
    const { key, ...rest } = props

    if (isNoResultsOption(option.id)) {
      return (
        <li
          key={key}
          {...rest}
          style={{
            ...rest.style,
            ...noResultsOptionStyles,
          }}
        >
          {option.label}
        </li>
      )
    }

    const label = formatOptionLabel(option)
    const highlightedParts = highlightText(label, inputValue)

    return (
      <li key={key} {...rest}>
        {highlightedParts.map((part: HighlightPart, index: number) =>
          part.highlight ? (
            <strong key={index} style={highlightedTextStyles}>
              {part.text}
            </strong>
          ) : (
            <span key={index}>{part.text}</span>
          )
        )}
      </li>
    )
  }

  return (
    <Box className={className} sx={searchContainerStyles}>
      <Autocomplete
        disablePortal={true}
        clearOnEscape={true}
        filterOptions={(x) => x}
        open={open}
        options={filteredOptions}
        getOptionLabel={formatOptionLabel}
        loading={isLoading && hasInput}
        noOptionsText={''}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        inputValue={inputValue}
        freeSolo={true}
        onInputChange={handleInputChange}
        loadingText='Завантаження...'
        sx={autocompleteStyles(width)}
        slotProps={{
          paper: {
            sx: getPaperStyles(marginTop, paperHeight),
          },
          listbox: {
            sx: getListboxStyles(overflow, paperHeight),
          },
          popupIndicator: {
            sx: popupIndicatorStyles,
          },
          clearIndicator: {
            sx: clearIndicatorStyles,
          },
        }}
        renderOption={renderOption}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Пошук'
            variant='outlined'
            sx={textFieldStyles}
          />
        )}
      />
    </Box>
  )
}
