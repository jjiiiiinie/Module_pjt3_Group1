package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.entity.CatalogEntity;

public interface CatalogService {
    Iterable<CatalogEntity> getAllCatalogs();
    CatalogDto createCatalog(CatalogDto catalogDto);
    CatalogDto updateCatalog(CatalogDto catalogDto);
    void deleteByCartId(Long productId);
}
