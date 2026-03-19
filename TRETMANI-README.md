# Tretmani Sekcija - Dokumentacija

## Pregled

Dodana je nova "Tretmani" sekcija u navbar sajta koja omogućava korisnicima da pristupe detaljnim informacijama o različitim estetskim tretmanima koje nudi Ordinacija West.

## Funkcionalnosti

### Desktop Verzija
- **Dropdown meni**: Na hover se prikazuje podmeni sa listom tretmana
- **6 tretmana**: PRP, Botox, Dermal Fileri, Mezoterapija, Biorevitalizacija, Hijaluronska Kiselina
- **Smooth animacije**: Elegantne animacije prilikom otvaranja/zatvaranja menija

### Mobilna Verzija
- **Prioritet pozicija**: Tretmani se prikazuju na vrhu mobilnog menija
- **Touch optimizovan**: Lako prekucavanje i navigacija na touch uređajima
- **Accordion stil**: Tretmani se proširuju/smanjuju klikom

## Struktura Stranica

### Glavna Stranica za Tretmane
Svaki tretman ima svoju dedejovanu HTML stranicu sa sledecom strukturom:

```
/naziv-tretmana.html
├── Header (sa povratnim dugmetom)
├── Hero sekcija (naslov i opis tretmana)
├── 6 Q&A sekcija (pitanje/odgovor format)
│   ├── Sekcija 1 (bela pozadina)
│   ├── Sekcija 2 (siva pozadina)
│   ├── Sekcija 3 (bela pozadina)
│   └── ... (alterniraju boja pozadine)
└── WhatsApp dugme za zakazivanje
```

### Dizajn Layout
- **Grid sistem**: 2-koloni layout (pitanje levo, odgovor desno)
- **Responsive**: Na mobilnom se prelazi na 1-koloni layout
- **Animacije**: Scroll-activated animacije za svaku sekciju
- **Tipografija**: Montserrat za naslove, Open Sans za tekst

### Kreiranje Novih Stranica

#### PRP Tretman (Kompletna stranica)
- **prp-tretman.html**: Potpuno razvijen sadržaj
- **6 Q&A sekcija** sa realnim sadržajem:
  1. Šta je PRP?
  2. Kome se preporučuje PRP?
  3. Kada nije dozvoljen PRP?
  4. Koliko tretmana je potrebno?
  5. Kako se priprema koža pre tretmana?
  6. Kakva je nega nakon tretmana?

#### Placeholder Stranice
Ostali tretmani imaju placeholder strukture sa Lorem ipsum tekstom:
- **botox-tretman.html**
- **fileri-tretman.html** 
- **mezoterapija-tretman.html**
- **biorevitalizacija-tretman.html**
- **hijaluron-tretman.html**

## Tehnička Implementacija

### CSS Klase
```css
.dropdown              # Dropdown kontejner
.dropdown-toggle       # Trigger dugme za dropdown
.dropdown-menu         # Lista tretmana
.dropdown-link         # Linkovi u listi
.mobile-open          # Klasa za otvoreni dropdown na mobilnom
.treatment-container  # Kontejner za tretman stranice
.qa-section          # Sekcija pitanja/odgovora
.qa-container        # Grid kontejner
.question-side       # Leva kolona (pitanje)
.answer-side         # Desna kolona (odgovor)
```

### JavaScript Funkcionalnosti
- **Automatic dropdown handling**: Postojeći kod automatski prepoznaje dropdown elemente
- **Mobile optimizations**: Touch events i responsive behavior
- **Smooth scrolling**: Animirane tranzicije između sekcija
- **Menu management**: Automatsko zatvaranje prilikom navigacije

### SEO Optimizacije
- **Unique meta tags**: Svaka stranica ima specifične meta tagove
- **Structured descriptions**: Optimizovani opisi za svaki tretman
- **Keywords**: Lokalni SEO sa "Požega" keywords
- **Open Graph**: Socijalni media optimizacije

## WhatsApp Integracija

### Desktop
- **Floating button**: Fixed pozicionirani dugme sa tekstom
- **Custom poruke**: Svaki tretman ima customizovanu WhatsApp poruku

### Mobile
- **Icon only**: Na mobilnim uređajima se prikazuje samo ikonica
- **Bottom positioning**: Optimalno mesto za thumb navigaciju

## Dodavanje Novog Tretmana

1. **Kreiranje HTML stranice**:
   ```html
   novi-tretman.html
   ```

2. **Dodavanje u navbar**:
   ```html
   <li><a href="novi-tretman.html" class="dropdown-link">Novi Tretman</a></li>
   ```

3. **Customizovanje sadržaja**:
   - Ažuriranje meta tagova
   - Dodavanje specifičnih pitanja/odgovora
   - Prilagođavanje WhatsApp poruke

## Stilski Konzistentnost

### Boje
- **Primary**: #2c5aa0 (plava)
- **Secondary**: #4a7bc8 (svetlo plava)
- **Pozadina**: #f8f9fa (svetlo siva)
- **Tekst**: #2c3e50 (tamno siva)

### Tipografija
- **Naslovi**: Montserrat, bold weights
- **Tekst**: Open Sans, regular/medium weights
- **Veličine**: Responsive clamp() funkcije

### Spacing
- **Sekcije**: 60px padding na desktop, 40px na mobile
- **Elementi**: CSS custom properties za konzistentan spacing

## Browser Podrška

- **Modern browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Fallbacks**: Graceful degradation za starije browsere

## Performance

- **Lazy loading**: Animacije se pokreću tek kada su vidljive
- **Optimizovane slike**: WebP format gde je podržan
- **Minifikovan CSS**: Production ready stilovi
- **Async loading**: Font Awesome i Google Fonts async

## Maintenance

- **Modularan kod**: Lako dodavanje novih tretmana
- **Konsistentne konvencije**: Uniform naming patterns
- **Documentation**: Komentari u kodu za buduće izmene
- **Version control**: Svi fajlovi su prilagođeni za Git workflow