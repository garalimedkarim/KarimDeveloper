<?php

namespace HomeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Region
 *
 * @ORM\Table(name="region")
 * @ORM\Entity(repositoryClass="HomeBundle\Repository\RegionRepository")
 */
class Region
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="region", type="string", length=50, unique=true)
     */
    private $region;

    /**
     * @var string
     *
     * @ORM\Column(name="prefixe_tel", type="string", length=10, nullable=true, unique=true)
     */
    private $prefixeTel;

    /**
    * @ORM\OneToMany(targetEntity="Ville",mappedBy="region")
    */   
    private $villes;
    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set region
     *
     * @param string $region
     *
     * @return Region
     */
    public function setRegion($region)
    {
        $this->region = $region;

        return $this;
    }

    /**
     * Get region
     *
     * @return string
     */
    public function getRegion()
    {
        return $this->region;
    }

    /**
     * Set prefixeTel
     *
     * @param string $prefixeTel
     *
     * @return Region
     */
    public function setPrefixeTel($prefixeTel)
    {
        $this->prefixeTel = $prefixeTel;

        return $this;
    }

    /**
     * Get prefixeTel
     *
     * @return string
     */
    public function getPrefixeTel()
    {
        return $this->prefixeTel;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->villes = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add ville
     *
     * @param \HomeBundle\Entity\Ville $ville
     *
     * @return Region
     */
    public function addVille(\HomeBundle\Entity\Ville $ville)
    {
        $this->villes[] = $ville;

        return $this;
    }

    /**
     * Remove ville
     *
     * @param \HomeBundle\Entity\Ville $ville
     */
    public function removeVille(\HomeBundle\Entity\Ville $ville)
    {
        $this->villes->removeElement($ville);
    }

    /**
     * Get villes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getVilles()
    {
        return $this->villes;
    }
}
