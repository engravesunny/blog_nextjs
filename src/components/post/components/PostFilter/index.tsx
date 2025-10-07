"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useStore } from "@/store/StoreProvider";
export const PostFilter = () => {
  const store = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const categories = store.use.postState.categories;
  const allTags = store.use.postState.allTags;
  const searchQuery = store.use.postState.searchQuery;
  const selectedCategory = store.use.postState.selectedCategory;
  const selectedTags = store.use.postState.selectedTags;
  const sortBy = store.use.postState.sortBy;
  const sortOrder = store.use.postState.sortOrder;
  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    store.getState().setSelectedTags(newTags);
  };
  return (
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="搜索文章标题、内容或标签..."
          value={searchQuery}
          onChange={(e) => store.getState().setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        {/* Filter Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button
            startIcon={<FilterListIcon />}
            endIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={() => setShowFilters(!showFilters)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            筛选选项
          </Button>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={sortBy}
                onChange={(e) =>
                  store
                    .getState()
                    .setSortBy(e.target.value as "date" | "views" | "likes")
                }
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="date">按日期排序</MenuItem>
                <MenuItem value="views">按浏览量排序</MenuItem>
                <MenuItem value="likes">按点赞数排序</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={() =>
                store
                  .getState()
                  .setSortOrder(sortOrder === "asc" ? "desc" : "asc")
              }
              sx={{
                transform: sortOrder === "desc" ? "rotate(180deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            >
              <SortIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Filter Options */}
        <Collapse in={showFilters}>
          <Box
            sx={{
              mt: 3,
              pt: 3,
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            {/* Categories */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                分类
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                  label="全部"
                  onClick={() => store.getState().setSelectedCategory("")}
                  color={selectedCategory === "" ? "primary" : "default"}
                  sx={{ borderRadius: 2 }}
                />
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    label={`${category.name} (${category.count})`}
                    onClick={() =>
                      store.getState().setSelectedCategory(category.name)
                    }
                    color={
                      selectedCategory === category.name ? "primary" : "default"
                    }
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
            </Box>

            {/* Tags */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                标签
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {allTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    onClick={() => handleTagToggle(tag)}
                    color={selectedTags.includes(tag) ? "primary" : "default"}
                    variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};
